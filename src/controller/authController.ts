import { Controller, Route, Post, Body, Request } from "tsoa";
import { AuthInput } from "../model/authInput";
import { authenticate } from "../auth/jwt";

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

  public async refreshTokens() {

  }

  public async logout() {

  }
}