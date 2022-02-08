import { MaxLength, Property, Required } from "@tsed/schema";

export class PhotoModel {
	status?: number;

	@Property()
	idPhoto?: number;
	
	@Property()
	idAlbum?: number;
	
	@Property()
	serverName?: string;
	
	@Property()
	url?: string;
	
	@Property()
	size?: number;
	
	@Property()
	fileName?: string;
	
	@Property()
	type?: string;

	@Property()
	@Required()
	@MaxLength(100)
	title?: string;

	@Property()
	@MaxLength(100)
	color?: string;

	@Property()
	@MaxLength(100)
	description?: string;

	@Property()
	@MaxLength(100)
	datetimeCreation?: string;
}