import knex from 'knex'
import configs from './config'

require('dotenv/config');

const config = configs[process.env.CONNECTION_NAME ?? 'dev']

const connection = knex(config)

export default connection