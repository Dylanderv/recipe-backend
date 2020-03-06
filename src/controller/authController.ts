import { Controller, Route, Post, Body, Request, Security } from "tsoa";
import { AuthInput } from "../model/authInput";
import { authenticate, refreshUsersToken, logOutUser } from "../auth/jwt";

@Route("auth")
export class AuthController extends Controller {

  @Post("login")
  public async authenticate(@Body() authInput: AuthInput) {
    console.log("hello");
    let tokens; 
    try {
      tokens = await authenticate(authInput.email, authInput.password)
    } catch (err) {
      // TODO: Handle err
      throw err;
    }
    return tokens;
  }

  @Post("refreshTokens")
  public async refreshTokens(@Body() data: {refreshtoken: string}) {
    let tokens;
    try {
      tokens = await refreshUsersToken(data.refreshtoken);
    } catch (err) {
      // TODO: Handle err
      throw err;
    }
    return tokens
  }

  @Security("jwt")
  @Post("logout")
  public async logout(@Request() request: any, @Body() data: {refreshtoken: string}) {
    let userId = request.user.id
    await logOutUser(userId, data.refreshtoken);
  }
}