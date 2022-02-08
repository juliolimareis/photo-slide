import { UserModel } from "src/models/UserModel";

import {Inject, Injectable} from "@tsed/common";

import { UserType } from "src/enuns/UserType";

import { UserProvider } from 'src/providers/UserProvider';

@Injectable()
export class UserService {
	@Inject() userProvider: UserProvider

	// ================ GETS ===================
	
	async getById(id: number): Promise<UserModel> {
		let user: UserModel = await this.userProvider.fetchUser(id)
		user.password = "******"
		return user
	}

	// ================ POSTS ===================

	async create(user: UserModel): Promise<UserModel> {
		user = this.configPassword(user)
		user.status = 0
		user.userType = UserType.APLICATION
		let id = await this.userProvider.dispatchUser(user)
		return this.getById(id)
	}

	// ================ PUT ===================

	async update(id: number, user: UserModel): Promise<UserModel> {		
		user = this.configPassword(user)
		user.userType = UserType.APLICATION
		await this.userProvider.updateUser(id, user)
		return this.getById(id)
	}

	configPassword(user: UserModel): UserModel {
		const md5 = require('md5');
		user.password = md5(user.password)
		return user
	}

}
