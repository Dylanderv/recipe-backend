import { Controller, Route, Post, Body, Get, Query } from "tsoa";
import { UserInput } from "../model/userInput";
import { User } from "../database/model/User";
import { UserService } from "../services/UserService";

@Route("user")
export class UserController extends Controller {

  @Get()
  public async getUser(@Query() id: string): Promise<User> {
    return await UserService.getUser(id);
  }
  
  @Post()
  public async createUser(@Body() userInput: UserInput): Promise<User> {
    try {
      return await UserService.createUser(userInput);
    } catch (error) {
      this.setStatus(500);
    }
  }
}