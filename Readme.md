> # Photo-Slide API - v1.0.0

## Criar base da dados
Banco Mariadb
1. Script de criação em => ./api/database/script-database-create.sql

2. Configurar conexões em ./api/.env
> Configuração da API no arquivo .env

3. Selecionar conexão padrão em ./api/.env
``` sh
CONNECTION_NAME="dev"
```

## Iniciar API
> Instalar dependências
``` sh
$ npm install
```
> API start
``` sh
$ npm start
```
> Via Docker
``` sh
$ sudo docker-compose up -d
```

## Api Documentação 
> Swegger: http://localhost:8097

## Build setup 
```batch
# install dependencies
$ npm install

# serve
$ npm run start

# build for production
$ npm run build
$ npm run start:prod
```

> # Photo-Slide-Front - v1.0.0

## Iniciar Front Next.js
> Instalar dependências
``` sh
$ npm install
```
> API start
``` sh
$ npm run dev
```
> Via Docker
``` sh
$ sudo docker-compose up -d
```

> # Photo-Slide-Docker - v1.0.0
**Front** e **back** podem ser inicializados na raiz da pasta do projeto
``` sh
$ sudo docker-compose up -d
```