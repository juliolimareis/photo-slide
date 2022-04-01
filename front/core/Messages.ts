export enum Message {
	REQUEST_ERROR = 'Erro inesperado na requisição',
	REQUEST_LOGIN_403 = 'Usuário ou senha inválidos.',
	REQUEST_ERROR_STATUS = '{status} - Erro inesperado na requisição', 
	REQUEST_REGISTER_500 = 'Email já cadastrado',
	
	INTERNAL_SERVER_ERROR = 'Ocorreu um erro interno no servidor.',
	
	ERROR_UNKNOWN = 'Ocorreu um erro inesperado.',
	
	PHOTO_ERROR_SIZE = `{photoName} não pode ser enviada. O tamanho excede o limite de 1MB.`,
	PHOTO_DELETE = 'Imagem {photo} removida com sucesso.',
	
	INVALID_EMAIL = 'E-mail inválido.',
	INVALID_PASSWORD = 'Senha deve conter pelo menos 6 caracteres.',
	INVALID_USERNAME = 'Nome de usuário deve conter pelo menos 6 caracteres.',
	
	REGISTER_SUCCESS = 'Cadastro realizado com sucesso.',
	
	LOGIN_SUCCESS = 'Login realizado com sucesso.',
	
	ALBUM_DELETE = 'Album removido com sucesso.',
	ALBUM_ADD = 'Álbum {album} adicionado com sucesso.',
	
	SUCCESS = 'Operação realizada com sucesso.',
}