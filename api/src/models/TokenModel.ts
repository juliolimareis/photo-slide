import { UserType } from "src/enuns/UserType"

export class TokenModel {
	exp?: number
	idPlayer: number
	userType: UserType
	iat?: any
}
