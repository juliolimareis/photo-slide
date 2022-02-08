import { isEmpty } from '@tsed/core';
import { Injectable } from '@tsed/common';

import { NotFound, BadRequest, Exception, InternalServerError, Forbidden } from "@tsed/exceptions";

export interface IThrowResp {
	title: string;
	message: string;
}

@Injectable()
export class ThrowResp {

	public NotFound(iThrowResp: IThrowResp): void {
		const error = new NotFound(iThrowResp.title);
		this.setHeader(error)
		error.errors = [iThrowResp];
		throw(error);
	}
	
	public BadRequest(iThrowResp: IThrowResp): void {
		const error = new BadRequest(iThrowResp.title);
		this.setHeader(error)
		error.errors = [iThrowResp]
		throw(error);
	}
	
	public Forbidden(iThrowResp: IThrowResp): void {
		const error = new Forbidden(iThrowResp.title);
		this.setHeader(error)
		error.errors = [iThrowResp]
		throw(error);
	}
	
	public InternalServerError(iThrowResp: IThrowResp): void {
		const error = new InternalServerError(iThrowResp.title);
		this.setHeader(error)
		error.errors = [iThrowResp]
		throw(error);
	}
	
	public isParamNumber(id: string): void {
		if (isNaN(parseInt(id))) {
			this.BadRequest({
				title: "Not a number",
				message: "Param is not a number"
			})
		}
	}

	private setHeader(error: Exception){
		error.setHeaders({
			"x-header": "value"
		});
	}
}