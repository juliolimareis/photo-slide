import { Injectable } from "@tsed/di";

import { PhotoModel } from '../models/PhotoModel';

import connection from "src/database/connection";

@Injectable()
export class PhotoProvider {

	table = "photo"

  //################# selects ####################

	async fetchById(idPhoto: number): Promise<PhotoModel> {
		const conn = connection()
		return (await conn.where({idPhoto}).table(this.table).limit(1))[0]
	}
	
	async fetchByServerName(serverName: string): Promise<PhotoModel> {
		const conn = connection()
		return (await conn.where({serverName}).table(this.table).limit(1))[0]
	}
	
	async fetchByAlbum(idAlbum: number): Promise<PhotoModel[]> {
		const conn = connection()
		return await conn.where({idAlbum, status: 0}).table(this.table)
	}

	async fetchByIdAndUser(idUser: number, idPhoto: number): Promise<PhotoModel> {
		const conn = connection()
		return (await conn.where({idUser, idPhoto}).table("vwPhotoUser").limit(1))[0]
	}
	
	async fetchAllByIdAndUserAlbum(idUser: number, idAlbum: number): Promise<PhotoModel[]> {
		const conn = connection()
		return await conn.where({idUser, idAlbum}).table("vwPhotoUser")
	}
	
	async fetchByIdAndUserAlbum(idUser: number, idPhoto: number): Promise<PhotoModel> {
		const conn = connection()
		return (await conn.where({idUser, idPhoto}).table("vwPhotoUser").limit(1))[0]
	}

  //################# inserts ####################

	async dispatch(photo: PhotoModel): Promise<number> {
		const conn = connection()
		return conn.insert(photo).into(this.table)
	}
	
	//################# updates ####################

	async update(idPhoto: number, photo: PhotoModel): Promise<void> {
		const conn = connection()
		return conn.where({idPhoto}).update(photo).table(this.table)
	}

	//################# deletes ####################

	async delete(idPhoto: number): Promise<void> {
		const conn = connection()
		return conn.where({idPhoto}).update({status: 1}).table(this.table)
	}
}