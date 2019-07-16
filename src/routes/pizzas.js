import { Router } from 'express'
import * as pizza from '../controllers/pizza'
import _pick from 'lodash/pick'

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
  return api
}

