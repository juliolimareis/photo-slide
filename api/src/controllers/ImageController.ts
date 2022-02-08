import { Summary } from "@tsed/schema";

import { rootDir, ServerPathImage } from "src/config";

import { ThrowResp } from "src/utils/ThrowResp";

import { PhotoService } from "src/services/PhotoService";

import {Controller, Get, Inject, PathParams, Res} from "@tsed/common";

@Controller("/image")
export class ImageController {
	@Inject() throwResp: ThrowResp
	@Inject() photoService: PhotoService

	/*************** Gets *****************/
	//TODO Colocar no service
	@Get("/:imageName")
	@Summary("Obter foto do servidor")
	async getPhotoFile(
		@Res() res: Res,
		@PathParams("imageName") imageName: string): Promise<any> {

			const fs = require('fs')
			const pathImage = `${ServerPathImage}/${imageName}`

			if (fs.existsSync(pathImage)) {
				
				const stream = require('stream')
				const r = fs.createReadStream(pathImage) // or any other way to get a readable stream
				const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
				
				stream.pipeline(r, ps, // <---- this makes a trick with stream error handling
					(err: any) => {
						if (err) {
							console.log(err) // No such file or any other kind of error
							this.throwResp.NotFound({title: "Image Server Error", message: "Não foi possível encontrar a imgem no servidor"})
						}
					})
					return ps.pipe(res)
				}
				
			this.throwResp.NotFound({title: "Image not found", message: "Imagem não encontrada"})		
	}
}


