import axios, { AxiosError, AxiosRequestHeaders } from "axios";

export const api = axios.create({
	baseURL: getUrl(),
	timeout: 60 * 1000, // maximo 1 min
});

export function getUrl(): string | undefined {
	if(process.env.DEV_MODE == 'true') {
		console.log(process.env.DEV_URL);
		
		return process.env.DEV_URL
	} 
	
	console.log(process.env.MHG_URL);
	return process.env.MHG_URL
}

export function getToken(): string | null {
	return localStorage.getItem('token-api')
}

export function getHeaders(): AxiosRequestHeaders {
	return {
    "Content-type": "application/json",
		"Authorization": `Bearer ${getToken()}`
  }
}

api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
		return Promise.reject(error);
  }
);

export default api;
