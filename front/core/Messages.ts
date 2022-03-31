export enum Message {
	REQUEST_ERROR = 'Erro inesperado na requisição',
	INTERNAL_SERVER_ERROR = 'Ocorreu um erro interno no servidor.',
	REQUEST_LOGIN_403 = 'Usuário ou senha inválidos.',
	ERROR_UNKNOWN = 'Ocorreu um erro inesperado.',
	PHOTO_ERROR_SIZE = `{photoName} não pode ser enviada. O tamanho excede o limite de 1MB.`,
	INVALID_EMAIL = 'E-mail inválido.',
	INVALID_PASSWORD = 'Senha deve conter pelo menos 6 caracteres.',
	INVALID_USERNAME = 'Nome de usuário deve conter pelo menos 6 caracteres.',
	REQUEST_REGISTER_500 = 'Email já cadastrado',
	REGISTER_SUCCESS = 'Cadastro realizado com sucesso.',
	LOGIN_SUCCESS = 'Login realizado com sucesso.',
	REQUEST_ERROR_STATUS = '{status} - Erro inesperado na requisição', 
}