import {Middleware, Req, Res, Next} from "@tsed/common";
import { Forbidden, Unauthorized } from "@tsed/exceptions";

//!* DEPRECATED

@Middleware()
export class AuthMiddleware {
  use(@Req() req: Req, @Res() res: Res, @Next() next: Next) {

		// if (!req.isAuthenticated()) { // passport.js method to check auth
      throw new Unauthorized("Unauthorized");
    // }

    // if (req.user?.role !== options.role) {
    //   throw new Forbidden("Forbidden");
    // }

  }
}
