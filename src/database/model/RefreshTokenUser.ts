import { User } from "./User";
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";

@Entity("refresh_token_user")
export class RefreshTokenUser {
  @PrimaryColumn("text")
  refreshToken: string;

  @ManyToOne(type => User)
  user: User;

}