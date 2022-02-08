import { UserModel } from "src/models/UserModel";

import { Summary } from "@tsed/schema";

import {Controller, Get} from "@tsed/common";

@Controller("/version")
export class Version {
  @Get("/")
	@Summary("Versão da API")
  getVersion(): any {
		return {
			version: process.env.VERSION
		}
  }

}
