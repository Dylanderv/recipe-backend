import { Repository, getManager } from "typeorm";
import { User } from "../database/model/User";
import { UserInput } from "../model/userInput";
import bcrypt from "bcrypt";
import { validate } from "class-validator";

export class UserService {
  public static async getUser(id: string): Promise<User> {
    const userRepository: Repository<User> = getManager().getRepository(User);
    return await userRepository.findOne(id);
  }

  public static async getUserByEmail(email: string): Promise<User> {
    const userRepository: Repository<User> = getManager().getRepository(User);
    return await userRepository.findOne({where: {email}})
  }

  public static async createUser(userInput: UserInput): Promise<User> {
    const userRepository: Repository<User> = getManager().getRepository(User);
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(userInput.password, salt);
    let user = new User();
    user.username = userInput.username;
    user.hashedPassword = hash;
    user.email = userInput.email;
    user.roles = ['USER'];
    const error = await validate(user);
    if (error.length > 0) {
      // Handle error
      console.log(error);
      throw Error();
    } else {
      return await userRepository.save(user);
    }
  }
}
