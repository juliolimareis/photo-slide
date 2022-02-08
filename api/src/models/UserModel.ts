import { Email, Ignore, MaxLength, MinLength, Property, Required } from "@tsed/schema";

export class UserModel {
  @Property()
  idUser?: number;

  @Property()
	@Required()
	@MinLength(4)
	@MaxLength(100)
  name: string;

  @Property()
	@Required()
	@MaxLength(100)
	@Email()
  email: string;

	@Property()
	@Required()
	@MaxLength(100)
	@MinLength(6)
  password?: string;

  status?: number;
  userType: number;
}
