import { sign, verify } from "jsonwebtoken"
import { Repository, getManager } from "typeorm"
import { User } from "../database/model/User"
import bcrypt from "bcrypt";
import { JWT_SECRET, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from "../env";
import { RefreshTokenUser } from "../database/model/RefreshTokenUser";

function comparePass(userPassword: string, databasePassword: string) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createToken(payload: string | object | Buffer, expireTime: string | number) {
  return sign(payload, JWT_SECRET, { expiresIn: expireTime });
}

function decodeAndVerifyToken(token: string) {
  let decodedToken;
  decodedToken = verify(token, JWT_SECRET);
  return decodedToken;
}

function createAccessAndRefreshToken(userId: string, roles: string[]) {
  return {
    accessToken: createToken({id: userId, roles}, ACCESS_TOKEN_EXPIRE),
    refreshToken: createToken({id: userId}, REFRESH_TOKEN_EXPIRE)
  };
}

function bindRefreshTokenToUser(user: User, refreshToken: string, refreshTokenRepository: Repository<RefreshTokenUser>) {
  let refreshTokenUser = new RefreshTokenUser();
  refreshTokenUser.refreshToken = refreshToken;
  refreshTokenUser.user = user
  refreshTokenRepository.insert(refreshTokenUser);
}

async function cleanRefreshTokenForUser(user: User, refreshTokenRepository: Repository<RefreshTokenUser>) {
  let refreshTokens: RefreshTokenUser[];
  try {
    refreshTokens = await refreshTokenRepository.find({ where: { user }});
  } catch (err) {
    throw new Error("Internal error while cleaning refresh tokens");
  }
  refreshTokens.forEach(elem => {
    try {
      decodeAndVerifyToken(elem.refreshToken);
    } catch (err) {
      refreshTokenRepository.remove(elem);
    }
  })
}

async function createBindAndClean(user: User) {
  // Create 2 jwt => Refresh (exp 1 day) and Access token (exp 15 minutes)
  const tokens = createAccessAndRefreshToken(user.id, user.roles);

  const refreshTokenRepository: Repository<RefreshTokenUser> = getManager().getRepository(RefreshTokenUser);
  // Bind the refresh token to the account in the database
  bindRefreshTokenToUser(user, tokens.refreshToken, refreshTokenRepository);
  // Check date of all token for this user
  await cleanRefreshTokenForUser(user, refreshTokenRepository);
  // Send them to the client (header/cookie/body?) ???
  return tokens;
}

export async function authenticate(emailInput: string, passwordInput: string) {
  console.log("on est là")
  // Check username and password
  const userRepository: Repository<User> = getManager().getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail({ where: { email: emailInput }});
  } catch (err) {
    // TODO: Handle error better
    throw new Error("Invalid username");
  }
  if (!comparePass(passwordInput, user.hashedPassword)) {
    throw new Error("Invalid password");
  }
  return await createBindAndClean(user);
}

export async function refreshUsersToken(refreshToken: string) {
  // Check if the token is valid for the account
  let decodedToken;
  try {
    decodedToken = decodeAndVerifyToken(refreshToken);
  } catch (err) {
    // TODO: Handle error better
    throw err;
  }
  await removeRefreshToken(refreshToken);
  const userRepository: Repository<User> = getManager().getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(decodedToken.id);
  } catch (err) {
    throw new Error("Error while fetching user")
  }
  return await createBindAndClean(user);
}

export async function logOutUser(refreshToken: string) {
  // Check if the refreshToken is valid
  decodeAndVerifyToken(refreshToken);
  // Mark it as invalid in the database
  await removeRefreshToken(refreshToken);

}

async function removeRefreshToken(refreshToken: string) {
  const refreshTokenRepository: Repository<RefreshTokenUser> = getManager().getRepository(RefreshTokenUser);
  let tokenInDb = await refreshTokenRepository.find({where: {refreshToken}});
  refreshTokenRepository.remove(tokenInDb);
}
