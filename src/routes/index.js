import express from 'express'
import * as models from '../models'
import pizzas from './pizzas'


export default function startApi(config) {
  const router = express()
  router.use('/pizzas', pizzas(models, { config }))
  return router
}

