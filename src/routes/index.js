import express from 'express'
import * as models from '../models'
import pizzas from './pizzas'
import toppings from './toppings'
import errorHandler from '../controllers/error-handler'

export default function startApi(config) {
  const router = express()
  router.use('/pizzas', pizzas(models, { config }))
  router.use('/toppings', toppings(models, { config }))
  router.use(errorHandler(models, { config }))
  return router
}

