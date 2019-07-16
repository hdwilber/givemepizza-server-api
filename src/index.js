import express from 'express'
import bodyParser from 'body-parser'
import startApi from './routes'
import mongoose from 'mongoose'
import cors from 'cors'
import config from '../config'

async function start(config) {
  const server = express()
  const port = config.API_SERVER_PORT || 3000

  server.use(cors())
  server.use(bodyParser.json())
  server.use('/api', startApi(config))
  const result = await server.listen(port)
  console.log('Server has started at: %o', port)
  return server
}

async function configure(config) {
  const { mongodb } = config
  const { host, port, dbName } = mongodb
  console.log(mongodb);
  const url = `${host}:${port}/${dbName}`
  await mongoose.connect(
    `mongodb:\/\/${url}`
  );
  return true
}


configure(config).then(async () => {
  const server = await start(config)
})

