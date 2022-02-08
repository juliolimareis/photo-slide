import { Injectable } from "@tsed/di";

import { Album } from './../models/Album';

import connection from "src/database/connection";

@Injectable()
export class AlbumProvider {

	table = "album"

  //################# selects ####################

	async fetchById(idAlbum: number): Promise<Album> {
		const conn = connection()
		return (await conn.where({idAlbum, status: 0}).table(this.table).limit(1))[0]
	}
	
	async fetchByUser(idUser: number): Promise<Album[]> {
		const conn = connection()
		return await conn.where({idUser, status: 0}).table(this.table)
	}
	
	async fetchByUserAndId(idUser: number, idAlbum: number): Promise<Album> {
		const conn = connection()
		return (await conn.where({idUser, idAlbum, status: 0}).table(this.table).limit(1))[0]
	}

  //################# inserts ####################

	async dispatch(album: Album): Promise<number> {
		const conn = connection()
		return conn.insert(album).into(this.table)
	}
	
	//################# updates ####################

	async update(id: number, album: Album): Promise<void> {
		const conn = connection()
		return conn.where({idAlbum: id}).update(album).table(this.table)
	}
	
	//################# delete ####################

	async delete(idUser: number, idAlbum: number): Promise<void> {
		const conn = connection()
		return conn.where({idUser, idAlbum}).update({status: 1}).table(this.table)
	}
	
}