import { Ignore, MaxLength, Property, Required } from "@tsed/schema";

export class Album {
	@Ignore()
	status?: number;
	
	@Property()
	idAlbum?: number;
	
	@Property()
	idUser?: number | null;

	@Property()
	@Required()
	@MaxLength(100)
	title: string;

	@Property()
	@MaxLength(500)
	coverUrl: string;

	@Property()
	@MaxLength(200)
	description: string;
}