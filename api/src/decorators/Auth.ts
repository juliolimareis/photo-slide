import { AuthService } from './../services/AuthService';
import {Inject} from "@tsed/common";
import {useDecorators, StoreSet} from "@tsed/core";
import {
  Middleware,
  Req,
  Res,
  Context,
  UseBefore,
} from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions/lib/clientErrors/Unauthorized";

export interface AuthOptions {
	role?: number
}
@Middleware()
export class AuthMiddleware {
	
	@Inject() authService: AuthService

  use(@Req() req: Req, @Res() res: Res, @Context() context: Context) {
		const {}: AuthOptions = context.endpoint.get(AuthMiddleware);
		
		if(!this.authService.varifyTokenRequest(req)){
			throw new Unauthorized('Unauthorized');
		}
		
		//throw new Forbidden('Forbidden');
    
  }
}

export function Auth(options?: AuthOptions): MethodDecorator {
  return useDecorators(
    StoreSet(AuthMiddleware, options),
    UseBefore(AuthMiddleware)
  );
}
