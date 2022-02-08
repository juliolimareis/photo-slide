import { Auth, AuthResponse } from './../models/Auth';

import api from "../config/api";
import { AxiosResponse } from "axios";

export class AuthProvider {
	async auth(auth: Auth): Promise<AxiosResponse<AuthResponse>> {
		return await api.post<AuthResponse>('/auth', auth)
	}
}
