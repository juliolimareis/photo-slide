import { Knex } from 'knex'

require('dotenv/config');

interface knexConfig {
	[key: string]: Knex.Config
}

const configs: knexConfig = {
	prod: {
		client: process.env.PROD_DRIVE,
		connection: {
			port: parseInt(process.env.PROD_PORT || ""),
			host: process.env.PROD_HOST,
			user: process.env.PROD_USER,
			password: process.env.PROD_PASSWORD,
			database: process.env.PROD_DATABASE,
		},
		debug: false,
		useNullAsDefault: true,
	},
	qas: {
		client: process.env.QAS_DRIVE,
		connection: {
			port: parseInt(process.env.QAS_PORT || ""),
			host: process.env.QAS_HOST,
			user: process.env.QAS_USER,
			password: process.env.QAS_PASSWORD,
			database: process.env.QAS_DATABASE,
		},
		debug: true,
		useNullAsDefault: true,
	},
	dev: {
		client: process.env.DEV_DRIVE,
		connection: {
			port: parseInt(process.env.DEV_PORT || ""),
			host: process.env.DEV_HOST,
			user: process.env.DEV_USER,
			password: process.env.DEV_PASSWORD,
			database: process.env.DEV_DATABASE,
		},
		debug: true,
		useNullAsDefault: true,
	},
}

export default configs