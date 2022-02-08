import { UserModel } from "src/models/UserModel";

import { Injectable } from "@tsed/di";

import connection from "src/database/connection";

@Injectable()
export class UserProvider {

	table = 'user';
	selectFields = "*"

  //################# selects ####################

	async fetchUserByEmail(email: string): Promise<UserModel> {
		const conn = connection()
		return (await conn.where({email: email}).from(this.table).limit(1))[0]
	}

	async fetchUser(id: number): Promise<UserModel> {
		const conn = connection()
		return (await conn.where({idUser: id}).table(this.table).limit(1))[0]
	}
	
  //################# inserts ####################

	async dispatchUser(user: UserModel): Promise<number> {
		const conn = connection()
		return conn.insert(user).into(this.table)
	}

	//################# updates ####################

	async updateUser(idUser: number, user: UserModel): Promise<UserModel[]> {
		const conn = connection()
		return conn.where({idUser}).update(user).table(this.table)
	}


}