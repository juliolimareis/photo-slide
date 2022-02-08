> # Photo-Slide - v1.0.0

## Iniciar aplicação
> Instalar dependências
``` sh
$ npm install
```
> API start
``` sh
$ npm start
```
> Docker
``` sh
$ sudo docker-compose up -d
```

## Api Documentação 
> Swegger: http://localhost:8097/rest

## Configurar conexões
> Configurar arquivo .env
``` sh
############### CONNECTION PROD ################
PROD_DRIVE='oracledb'
PROD_PORT=''
PROD_HOST=''
PROD_USER=''
PROD_PASSWORD=''
#schema
PROD_DATABASE=''

############### CONNECTION QAS ################
QAS_DRIVE='oracledb'
QAS_PORT=''
QAS_HOST=''
QAS_USER=''
QAS_PASSWORD=''
QAS_DATABASE=''

############### CONNECTION DEV ################
DEV_DRIVE=''
DEV_PORT=''
DEV_HOST=''
DEV_USER=''
DEV_PASSWORD=''
DEV_DATABASE=''
```

## Selecionar conexão padrão
> Alterar aquivo .env
``` sh
CONNECTION_NAME="qas"
```

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
