import { Router } from 'express'
import * as pizza from '../controllers/pizza'
import _pick from 'lodash/pick'
import _get from 'lodash/get'

export default (models, { config }) => {
  const api = Router()

  api.get('/', async function (req, res, next) {
    try {
      const data = _pick(req.params, ['limit', 'skip', 'search'])
      const result = await pizza.list(models, { config }, data)
      res.send(result)
    } catch(error) {
      next(error)
    }
  })
  api.get('/:_id', async function(req, res, next) {
    try {
      const data = {
        _id: req.params,
      }
      const result = await pizza.get(models, { config }, data)
      res.send(result)
    } catch(error) {
      next(error)
    }
  })

  api.post('/', async function (req, res, next) {
    try {
      const result = await pizza.create(models, { config }, req.body)
      res.send(result)
    } catch(error) {
      if (error.name === 'ValidationError') {
        const { errors } = error 
        const formattedError = Object.keys(errors).reduce((acc, key) => {
          const message = _get(errors, `${key}.message`)
          acc[key] = message
          return acc
        }, {})

        res.status(422).send({
          errors: formattedError,
        })
      } else {
        next(error)
      }
    }
  })
  return api
}

