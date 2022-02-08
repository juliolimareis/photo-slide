import { AlbumService } from 'src/services/AlbumService';
import { PhotoModel } from "src/models/PhotoModel";

import {Inject, Injectable, PlatformMulterFile} from "@tsed/common";

import { removeFile } from 'src/utils';
import { PhotoProvider } from "src/providers/PhotoProvider";
import { Album } from 'src/models/Album';
import { ServerPathImage } from 'src/config';

@Injectable()
export class PhotoService {
	@Inject() photoProvider: PhotoProvider
	@Inject() albumService: AlbumService

	/**
	 * @description obtem foto pelo id
	 * @param idPhoto
	 */
	async getById(id: number): Promise<PhotoModel> {
		return await this.photoProvider.fetchById(id)
	}
	
	/**
	 * @description obtem foto pelo nome do arquivo no servidor
	 * @param serverName
	 */
	async getByIdServerName(serverName: string): Promise<PhotoModel> {
		return await this.photoProvider.fetchByServerName(serverName)
	}

	/**
	 * @description obtem fotos do album
	 * @param idAlbum
	 */
	async getByAlbum(idAlbum: number): Promise<PhotoModel[]> {
		return await this.photoProvider.fetchByAlbum(idAlbum)
	}
	
	/**
	 * @description obtem foto do usuário
	 * @param idUser
	 * @param idPhoto
	 */
	async getPhotoUser(idUser: number, idPhoto: number): Promise<PhotoModel> {
		return await this.photoProvider.fetchByIdAndUser(idUser, idPhoto)
	}
	
	/**
	 * @description obtem fotos do album pelo usuário
	 * @param idUser
	 * @param idAlbum
	*/
	async findAllPhotoUserAlbum(idUser: number, idAlbum: number): Promise<PhotoModel[]> {
		return await this.photoProvider.fetchAllByIdAndUserAlbum(idUser, idAlbum)
	}
	
	/**
	 * @description obtem a foto do album pelo usuário e idPhoto
	 * @param idUser
	 * @param idAlbum
	 * @param idPhoto
	*/
	async findPhotoUserAlbum(idUser: number, idPhoto: number): Promise<PhotoModel> {
		return await this.photoProvider.fetchByIdAndUserAlbum(idUser, idPhoto)
	}

	async create(photo: PhotoModel): Promise<PhotoModel> {
		photo.status = 0
		const id = await this.photoProvider.dispatch(photo)
		return this.photoProvider.fetchById(id)
	}

	async update(idPhoto: number, photo: PhotoModel): Promise<PhotoModel> {
		await this.photoProvider.update(idPhoto, photo)
		const p = await this.photoProvider.fetchById(idPhoto)
		return p
	}
	
	/**
	 * @description deleta foto do usuario pelo id
	 * @param idUser 
	 * @param idAlbum 
	 * @param idPhoto 
	 */
	async delete(idUser: number, idPhoto: number): Promise<void> {
		const photo = await this.findPhotoUserAlbum(idUser, idPhoto)

		if(photo) {
			await this.photoProvider.delete(idPhoto)
			this.removePhoto(`${ServerPathImage}/${photo.serverName}`)
		}

	}

	async addPhoto(file: PlatformMulterFile, album: Album): Promise<PhotoModel> {
		let photo = await this.create({
			fileName: file.originalname,
			serverName: file.filename,
			type: file.mimetype,
			size: file.size,
			idAlbum: album.idAlbum,
			status: 0,
		})

		if(!album.coverUrl){
			album.coverUrl = `${photo.serverName}`
			await this.albumService.update(album.idAlbum ?? 0, album)
		}

		return photo
	}
	

	async removePhoto(path: string): Promise<void> {
		await removeFile(path)
	}

}
