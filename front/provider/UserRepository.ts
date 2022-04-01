import api from "../config/api";
import { AxiosResponse } from "axios";

import { Register } from '../models/Register';

export class UserRepository {
	async create(register: Register): Promise<AxiosResponse> {
		return await api.post('/user', register)
	}
}
