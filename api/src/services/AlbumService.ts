import { Album } from "src/models/Album";

import {Inject, Injectable} from "@tsed/common";

import { AlbumProvider } from "src/providers/AlbumProvider";
import { PhotoProvider } from "src/providers/PhotoProvider";

@Injectable()
export class AlbumService {
	@Inject() albumProvider: AlbumProvider
	@Inject() photoProvider: PhotoProvider
	
	/**
	 * @description busca o album pelo id
	 * @param id 
	 */
	async getById(id: number): Promise<Album> {
		return await this.albumProvider.fetchById(id)
	}
	
	/**
	 * @description busca todos os albuns do usuário
	 * @param idUser 
	 */
	async getByUser(idUser: number): Promise<Album[]> {
		return this.albumProvider.fetchByUser(idUser)
	}

	/**
	 * @description procura o album do usuário
	 * @param idUser 
	 * @param idAlbum 
	 */
	async findByUser(idUser: number, idAlbum: number): Promise<Album> {
		return await this.albumProvider.fetchByUserAndId(idUser, idAlbum)
	}

	async create(album: Album): Promise<Album> {
		album.status = 0
		let id = await this.albumProvider.dispatch(album)
		return this.albumProvider.fetchById(id)
	}

	async update(idAlbum: number, album: Album): Promise<Album> {
		await this.albumProvider.update(idAlbum, album)
		return await this.albumProvider.fetchById(idAlbum)
	}
	
	/**
	 * @description deleta o album pelo id
	 * @param idUser 
	 * @param idAlbum 
	 */
	async delete(idUser: number, idAlbum: number): Promise<void> {
		await this.albumProvider.delete(idUser, idAlbum)
	}

}
