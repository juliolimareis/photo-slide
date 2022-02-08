import { Auth } from 'src/decorators/Auth';

import { Returns, Summary } from "@tsed/schema";

import {BodyParams, Controller, Delete, Get, HeaderParams, Inject, MultipartFile, PathParams, PlatformMulterFile, Post, Put, Req, Res} from "@tsed/common";

import { Album } from "src/models/Album";
import { UserModel } from 'src/models/UserModel';
import { PhotoModel } from "src/models/PhotoModel";

import { ThrowResp } from "src/utils/ThrowResp";

import { UserService } from 'src/services/UserService';
import { AuthService } from "src/services/AuthService";
import { AlbumService } from "src/services/AlbumService";
import { PhotoService } from "src/services/PhotoService";

@Controller("/profile")
export class Profile {
	@Inject() throwResp: ThrowResp
	@Inject() authService: AuthService
	@Inject() userService: UserService
	@Inject() albumService: AlbumService
	@Inject() photoService: PhotoService

	/*************** Gets *****************/

	@Auth({role: 0})
  @Get("/")
	@Summary("Obter informações do perfil do usuário")
	@Returns("User", UserModel)
  async getProfile(@Req() req: Req): Promise<UserModel> {
		let idUser = this.authService.getRequestIdUser(req)
		return await this.userService.getById(idUser ?? 0);
  }

	@Auth({role: 0})
	@Put("/")
	@Summary("Atualizar usuário")
	@Returns("User", UserModel)
	async updateProfile(@Req() req: Req, @BodyParams() body: UserModel): Promise<UserModel> {
		let idUser = this.authService.getRequestIdUser(req)
		return await this.userService.update(idUser ?? 0, body);
	}

	//////////////////// ALBUMS ////////////////////
	
	@Auth({role: 0})
  @Get("/album")
	@Summary("Obter álbuns do usuário")
	@Returns("Albums", Album)
  async getAlbums(@Req() req: Req): Promise<Album[]> {
		let idUser = this.authService.getRequestIdUser(req)
		return await this.albumService.getByUser(idUser ?? 0)
  }

	@Auth({role: 0})
  @Post("/album")
	@Summary("Add álbum")
	@Returns(201, Album)
  async addAlbum(@Req() req: Req, @BodyParams() body: Album): Promise<Album> {
		body.idUser = this.authService.getRequestIdUser(req)
		return await this.albumService.create(body)
	}
	
	@Auth({role: 0})
  @Post("/album/:idAlbum/photo/upload")
	@Summary("Add foto no álbum do usuário")
	@Returns(201)
  async addPhotoAlbum(
		@Req() req: Req, 
		@HeaderParams("host") host: string,
		@PathParams("idAlbum") idAlbum: string,
		@HeaderParams("x-forwarded-proto") protocol: string,
		@MultipartFile("file", 10) file: PlatformMulterFile): Promise<PhotoModel> {
		
		const idUser = this.authService.getRequestIdUser(req)
		this.throwResp.isParamNumber(idAlbum)

		const album = await this.albumService.findByUser(idUser ?? 0, parseInt(idAlbum))
		
		if (!album){
			this.throwResp.NotFound({title: "Album not found", message: "Álbum não encontrado"})
		}
		
		if(file.originalname.includes(".png") || file.originalname.includes(".jpg") || file.originalname.includes(".jpeg")){
			if(file.size <= 1048576){
				return await this.photoService.addPhoto(file, album)
			}
			this.photoService.removePhoto(file.path)
			this.throwResp.BadRequest({title: "Image size", message: "imagem maior que 1MB"})
		}

		this.photoService.removePhoto(file.path)
		this.throwResp.BadRequest({title: "Type image", message: "Imagem deve ser do tipo .png, .jpg ou .jpeg"})

		return new PhotoModel
	}

	@Auth({role: 0})
  @Get("/album/:idAlbum/photo")
	@Summary("Obter todas as fotos do álbum do usuário")
	@Returns(200, PhotoModel)
  async getPhotosAlbum(@Req() req: Req, @PathParams("idAlbum") idAlbum: string): Promise<PhotoModel[]> {
		const idUser = this.authService.getRequestIdUser(req)
		this.throwResp.isParamNumber(idAlbum)
		return await this.photoService.findAllPhotoUserAlbum(idUser ?? 0, parseInt(idAlbum))
	}

	@Auth({role: 0})
  @Get("/album/:idAlbum")
	@Summary("Obter album do usuário")
	@Returns(200, Album)
  async getAlbum(@Req() req: Req, @PathParams("idAlbum") idAlbum: string): Promise<Album> {
		const idUser = this.authService.getRequestIdUser(req)		
		this.throwResp.isParamNumber(idAlbum)
		return await this.albumService.findByUser(idUser, parseInt(idAlbum))
	}
	
	@Auth({role: 0})
  @Delete("/album/:idAlbum")
	@Summary("Remover album do usuário")
	@Returns(200, PhotoModel)
  async deleteAlbum(@Req() req: Req, @PathParams("idAlbum") idAlbum: string): Promise<void> {
		const idUser = this.authService.getRequestIdUser(req)		
		this.throwResp.isParamNumber(idAlbum)
		await this.albumService.delete(idUser ?? 0, parseInt(idAlbum))
	}
	
	//////////////////// PHOTOS ////////////////////

	@Auth({role: 0})
  @Get("/photo/:idPhoto")
	@Summary("Obter foto do usuário")
	@Returns(200, PhotoModel)
  async getPhotos(@Req() req: Req, @PathParams("idPhoto") idPhoto: string): Promise<PhotoModel> {
		const idUser = this.authService.getRequestIdUser(req)
		this.throwResp.isParamNumber(idPhoto)
		return await this.photoService.getPhotoUser(idUser ?? 0, parseInt(idPhoto))
	}

	@Auth({role: 0})
  @Delete("/photo/:idPhoto")
	@Summary("Remover foto do usuário")
	@Returns(200, PhotoModel)
  async deletePhoto(@Req() req: Req, @PathParams("idPhoto") idPhoto: string): Promise<void> {
		const idUser = this.authService.getRequestIdUser(req)
		this.throwResp.isParamNumber(idPhoto)
		await this.photoService.delete(idUser ?? 0, parseInt(idPhoto))
	}

	@Auth({role: 0})
  @Put("/photo/:idPhoto")
	@Summary("Atualizar foto do usuário")
	@Returns(200, PhotoModel)
  async updatePhoto(@Req() req: Req, @PathParams("idPhoto") idPhoto: string, @BodyParams() body: PhotoModel): Promise<PhotoModel> {
		const idUser = this.authService.getRequestIdUser(req)
		this.throwResp.isParamNumber(idPhoto)
		const _idPhoto = parseInt(idPhoto)

		const photo = await this.photoService.findPhotoUserAlbum(idUser ?? 0, _idPhoto)

		if (photo){
			return await this.photoService.update(_idPhoto, body)
		}

		this.throwResp.NotFound({title: "Photo not found", message: "Foto não encontrada"})

		return new PhotoModel
	}
}


