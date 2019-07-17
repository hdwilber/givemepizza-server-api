import _pick from 'lodash/pick'
import NotFoundError from '../common/notfound-error'

export async function list( { Pizza }, { config }, data) {
  let { limit, skip, search } = data
  skip = skip ? parseInt(skip, 10) : 0;
  limit = limit ? parseInt(limit, 10) : 100;

  const query = {};
  const pizzas = await Pizza.find(query).populate('toppings')
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });

  return {
    pizzas,
  }
}

export async function get({Pizza}, { config }, data) {
  try {
    const { _id } = data
    const pizza = await Pizza.findOne({ _id });
    if (pizza) {
      return {
        pizza,
      }
    }
  } catch(error) {
    throw new NotFoundError('No pizza found')
  }
}

export async function create({ Pizza }, { config } , body) {
  const data = _pick(body, ['name'])
  const pizza = await Pizza.create(data)
  return {
    pizza,
  }
}

export function remove({ Pizza }, { config } , _id) {
  return Pizza.deleteOne({ _id, })
}

export async function addTopping({ Pizza, Topping }, { config }, { _id, toppingId }) {
  try {
    const pizza = await Pizza.findOne({_id})
    const topping = await Topping.findOne({_id: toppingId})
    await Pizza.update({ _id,
      'toppings': { $ne: toppingId }
    }, { $push: { toppings: toppingId } })
    return {
      topping,
    }
  } catch(error) {
    throw new NotFoundError('Pizza or Topping do not exists')
  }
}

export async function removeTopping({ Pizza, Topping }, { config }, { _id, toppingId }) {
  try {
    const pizza = await Pizza.findOne({_id})
    const topping = await Topping.findOne({_id: toppingId})
    return Pizza.update({ _id,
    }, { $pull: { toppings: toppingId } })
  } catch(error) {
    throw new NotFoundError('Pizza or Topping do not exists')
  }
}
