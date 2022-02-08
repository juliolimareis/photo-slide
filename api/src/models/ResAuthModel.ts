import {Property} from "@tsed/schema";

export class ResAuthModel {
  @Property()
  success: boolean
	
  @Property()
  token: any
  
  @Property()
  name?: string
  
	@Property()
  errors: Array<string>

}
