import { isEmpty } from '@tsed/core';

import { Summary } from '@tsed/schema';

import { ThrowResp } from 'src/utils/ThrowResp';

import { AuthModel } from "src/models/AuthModel";
import { ResAuthModel } from 'src/models/ResAuthModel';

import { AuthService } from "src/services/AuthService";

import {BodyParams, Controller, Inject, Post} from "@tsed/common";

@Controller("/auth")
export class Authentication {
	@Inject() throwResp: ThrowResp
	@Inject() authService: AuthService
	
	@Summary("Autenticação de usuário")
  @Post("/")
	async auth(@BodyParams() body: AuthModel): Promise<ResAuthModel> {
		let token = await this.authService.validadeUser(body)

    if(isEmpty(token)){
			this.throwResp.Forbidden({title:"User invalid", message: "Usuário ou senha inválidos"})
		}
		
		return {
			success: true,
			token: token,
			errors: []
		}
  }
}
