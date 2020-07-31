import { sign, verify } from "jsonwebtoken"
import { User } from "../database/model/User"
import bcrypt from "bcrypt";
import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../env";
import { RefreshTokenUserService } from "../services/RefreshTokenUserService";
import { UserService } from "../services/UserService";

export enum TokenEnum {
  ACCESS_TOKEN = "Access_Token",
  REFRESH_TOKEN = "Refresh_Token"
}

function comparePass(userPassword: string, databasePassword: string) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createToken(payload: string | object | Buffer, expireTime: string | number, type: TokenEnum) {
  return sign(payload,
    type === TokenEnum.ACCESS_TOKEN ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
    { expiresIn: expireTime }
  );
}

export function decodeAndVerifyToken(token: string, type: TokenEnum) {
  let decodedToken;
  decodedToken = verify(token, type === TokenEnum.ACCESS_TOKEN ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET);
  return decodedToken;
}

function createAccessAndRefreshToken(userId: string, roles: string[]) {
  return {
    accessToken: createToken({id: userId, roles}, ACCESS_TOKEN_EXPIRE, TokenEnum.ACCESS_TOKEN),
    refreshToken: createToken({id: userId}, REFRESH_TOKEN_EXPIRE, TokenEnum.REFRESH_TOKEN)
  };
}

async function bindRefreshTokenToUser(user: User, refreshToken: string) {
  return await RefreshTokenUserService.bindUserToRefreshToken(user, refreshToken);
}

async function cleanRefreshTokenForUser(user: User) {
  return await RefreshTokenUserService.removeExpiredRefreshTokenForUser(user);
}

async function createBindAndClean(user: User) {
  // Create 2 jwt => Refresh (exp 1 day) and Access token (exp 15 minutes)
  const tokens = createAccessAndRefreshToken(user.id, user.roles);
  // Bind the refresh token to the account in the database
  bindRefreshTokenToUser(user, tokens.refreshToken);
  // Check date of all token for this user
  await cleanRefreshTokenForUser(user);
  // Send them to the client (header/cookie/body?) ???
  return tokens;
}

export async function authenticate(emailInput: string, passwordInput: string) {
  // Check username and password
  let user: User;
  try {
    user = await UserService.getUserByEmail(emailInput);
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
    decodedToken = decodeAndVerifyToken(refreshToken, TokenEnum.REFRESH_TOKEN);
  } catch (err) {
    // TODO: Handle error better
    throw err;
  }
  await removeRefreshToken(decodedToken.id, refreshToken);
  let user: User;
  try {
    user = await UserService.getUser(decodedToken.id);
  } catch (err) {
    throw new Error("Error while fetching user")
  }
  return await createBindAndClean(user);
}

export async function refreshAccessTokenOnly(refreshToken: string) {
  let decodedToken;
  try {
    decodedToken = decodeAndVerifyToken(refreshToken, TokenEnum.REFRESH_TOKEN);
  } catch (err) {
    throw err
  }
  let user: User;
  try {
    user = await UserService.getUser(decodedToken.id);
  } catch (err) {
    throw new Error("Error while fetching user")
  }
  return createToken({id: user.id, roles: user.roles}, ACCESS_TOKEN_EXPIRE, TokenEnum.ACCESS_TOKEN)
}

export async function logOutUser(userId: string, refreshToken: string) {
  // Mark it as invalid in the database
  await removeRefreshToken(userId, refreshToken);
}

async function removeRefreshToken(userId: string, refreshToken: string) {
  let user: User;
  try {
    user = await await UserService.getUser(userId);
  } catch (err) {
    throw new Error("Unable to find user" + err);
  }
  try {
    return RefreshTokenUserService.removeRefreshTokenForUser(user, refreshToken);
  } catch(err) {
    throw new Error("error while removing refreshtoken for user" + err);
  }
}
