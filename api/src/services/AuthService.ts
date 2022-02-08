
import jwt_decode from "jwt-decode";

import { isEmpty } from "@tsed/core";

import { Req } from "@tsed/common";
import {Inject, Injectable} from "@tsed/di";

import { UserType } from "src/enuns/UserType";

import { UserModel } from "src/models/UserModel";
import { AuthModel } from "src/models/AuthModel";
import { TokenModel } from "src/models/TokenModel";

import { UserProvider } from "src/providers/UserProvider";
import { Unauthorized } from "@tsed/exceptions";

require('dotenv/config');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
	@Inject() playerProvider: UserProvider
	
	//valida o usuário e retorna o token, em caso de falha retorna null
	async validadeUser(auth: AuthModel): Promise<string> {
		let user: UserModel = await this.playerProvider.fetchUserByEmail(auth.username)
		if(user != null){
			if(this.getMD5Password(auth.password) == user.password){
				return this.gerateToken(user.idUser || 0, user.userType)
			}
		}
		return ""
	}

	getMD5Password(password: string): string {
		// let md5 = require('md5');
		// return md5(password)
		return password
	}

	varifyTokenRequest(req: Req): boolean {
		const token = this.getToken(req)

		if(!isEmpty(token) && this.verifyToken(token)){
			return true
		}
		
		return false;
	}

	gerateToken(idPlayer: number, userType: UserType): string {
		
		if(idPlayer == 0){
			return ""
		}

		let data: TokenModel = {
			//exp: Math.floor(Date.now() / 1000) + (60 * 60) * 168, 
			idPlayer: idPlayer,
			userType: userType
		}
		return jwt.sign(data, process.env.TOKEN_SECRET)
	}
	
	verifyToken(token: string): boolean {
		try {
			jwt.verify(token, process.env.TOKEN_SECRET);
			return true
		} catch (error) {
			return false
		}
	}

	decodeToken(token: string): TokenModel {
		return jwt_decode(token)
	}

	getToken(req: Req): string {
		if (req.headers.authorization?.startsWith('Bearer ')) {
			return req.headers.authorization.split(' ')[1];
		}
		return ""
	}

	getRequestIdUser(req: Req): number{
		let token = this.getToken(req);
		
		if(!isEmpty(token)){
			return this.decodeToken(token).idPlayer
		}

		throw new Unauthorized('Unauthorized');
	}
}



