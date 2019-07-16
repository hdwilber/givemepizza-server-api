import dotenv from 'dotenv'
import _pick from 'lodash/pick'
import _get from 'lodash/get'

const { parsed } = dotenv.config()
const keys = [
  'API_SERVER_PORT',
  'JWT_SECRET',
]

const mongoKeys = {
  host: 'DB_MONGO_HOST',
  port: 'DB_MONGO_PORT',
  dbName: 'DB_MONGO_DBNAME',
  user: 'DB_MONGO_USER',
  password: 'DB_MONGO_USERPASS',
}

const config = _pick(parsed, keys)

config.mongodb = Object.keys(mongoKeys).reduce((acc, key) => {
  acc[key] =_get(parsed, mongoKeys[key]) 
  return acc
}, {})

config.jwt = {
  secret: config.JWT_SECRET,
  expiresIn: '1h',
  requestProperty: 'account',
}

export default config
