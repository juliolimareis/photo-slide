import { UserModel } from "src/models/UserModel";

import { Returns, Summary } from "@tsed/schema";

import { AuthService } from "src/services/AuthService";
import { UserService } from 'src/services/UserService';

import {BodyParams, Controller, Inject, Post} from "@tsed/common";

@Controller("/user")
export class User {
	@Inject() authService: AuthService
	@Inject() userService: UserService

  @Post("/")
	@Summary("Criar usuário")
	@Returns(201, UserModel)
  async createUser(@BodyParams() body: UserModel): Promise<UserModel> {
		return await this.userService.create(body);
  }

}
