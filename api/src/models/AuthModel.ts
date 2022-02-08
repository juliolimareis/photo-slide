import {In, MinLength, Required} from "@tsed/schema";

export class AuthModel {
	@MinLength(6)
  @Required()
  username: string;

  @MinLength(6)
  @Required()
  password: string;
}
