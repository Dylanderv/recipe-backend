import { User } from "database/model/User";
import { getManager, Repository } from "typeorm";
import { RefreshTokenUser } from "database/model/RefreshTokenUser";
import { decodeAndVerifyToken, TokenEnum } from "../auth/jwt";

export class RefreshTokenUserService {
  public static async bindUserToRefreshToken(user: User, refreshToken: string) {
    const refreshTokenRepository: Repository<RefreshTokenUser> = getManager().getRepository(RefreshTokenUser);
    let refreshTokenUser = new RefreshTokenUser();
    refreshTokenUser.refreshToken = refreshToken;
    refreshTokenUser.user = user
    return await refreshTokenRepository.insert(refreshTokenUser);
  }

  public static async removeExpiredRefreshTokenForUser(user: User) {
    const refreshTokenRepository: Repository<RefreshTokenUser> = getManager().getRepository(RefreshTokenUser);
    let refreshTokens: RefreshTokenUser[];
    try {
      refreshTokens = await refreshTokenRepository.find({ where: { user }});
    } catch (err) {
      throw new Error("Internal error while cleaning refresh tokens");
    }
    refreshTokens.forEach(elem => {
      try {
        decodeAndVerifyToken(elem.refreshToken, TokenEnum.REFRESH_TOKEN);
      } catch (err) {
        refreshTokenRepository.remove(elem);
      }
    })
  }

  public static async removeRefreshTokenForUser(user: User, refreshToken: string) {
    const refreshTokenRepository: Repository<RefreshTokenUser> = getManager().getRepository(RefreshTokenUser);
    let tokenInDb = await refreshTokenRepository.find({where: { user, refreshToken }});
    refreshTokenRepository.remove(tokenInDb);
  }
}