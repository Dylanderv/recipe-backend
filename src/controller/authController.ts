import { Controller, Route, Post, Body, Request, Security, Get } from "tsoa";
import { AuthInput } from "../model/authInput";
import { authenticate, refreshUsersToken, logOutUser, refreshAccessTokenOnly } from "../auth/jwt";
import { UserInput } from "model/userInput";
import * as koa from 'koa'
import { User } from "../database/model/User";
import { UserService } from "../services/UserService";

@Route("auth")
export class AuthController extends Controller {

  @Post("login")
  public async login(@Request() request: koa.Request, @Body() authInput: AuthInput) {
    console.log(request)
    let tokens: { accessToken?: string; refreshToken?: string; }; 
    try {
      console.log(authInput)
      tokens = await authenticate(authInput.email, authInput.password)
      console.log("??")
      
      request.ctx.cookies.set("koa::refresh", tokens.refreshToken, {httpOnly: true, expires: });
      request.ctx.cookies.set("koa::access", tokens.accessToken, {httpOnly: true});
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

  @Post("refreshAccessToken")
  public async refreshAccessToken(@Body() data: {refreshtoken: string}) {
    let token;
    try {
      token = await refreshAccessTokenOnly(data.refreshtoken);
    } catch(err) {
      throw err;
    }
    return token;
  }

  @Security("jwt")
  @Post("logout")
  public async logout(@Request() request: any, @Body() data: {refreshtoken: string}) {
    let userId = request.user.id
    await logOutUser(userId, data.refreshtoken);
  }

  @Post("register")
  public async register(@Request() request: koa.Request, @Body() userInput: UserInput) {
    const ctx = request.ctx;
    let user: User;
    try {
      if (ctx.isUnauthenticated()) {
        user = await UserService.createUser(userInput);
        return user;
      } else {
        throw new Error('403');
      }
    } catch (err) {
      if (err.message && err.message === 'Validation failed' || err.message === 'Password cannot be empty') {
        ctx.throw(400);
        // Add list error
      } else if (err.message === '403') {
        ctx.throw(403)
      } else {
        ctx.throw(401);
      }
    }
  }

  @Security("jwt")
  @Get("isauth")
  public async isAuth(@Request() request: koa.Request) {
    return request.ctx.isAuthenticated();
  }
}
