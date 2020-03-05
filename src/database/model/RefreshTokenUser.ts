import { User } from "./User";
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";

@Entity("refresh_token_user")
export class RefreshTokenUser {
  @PrimaryColumn("text")
  refreshToken: string;

  @ManyToOne(type => User)
  user: User;

}