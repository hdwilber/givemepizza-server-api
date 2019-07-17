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
  }
  throw new NotFoundError('No pizza found')
}

export async function create({ Pizza }, { config } , body) {
  try {
    const data = _pick(body, ['name'])
    const pizza = await Pizza.create(data)
    if (pizza) {
      console.log('new pizza has been created');
      return {
        pizza,
      }
    }
  } catch(error) {
    console.log(error);
    throw error
  }
}

export async function remove({ Pizza }, { config } , _id) {
  try {
    const result = await Pizza.deleteOne({ _id, })
    if (result) {
      console.log('new pizza has been created');
      return {
        done: 'ok'
      }
    }
  } catch(error) {
    console.log(error);
    throw error
  }
}

export async function addTopping({ Pizza, Topping }, { config }, { _id, toppingId }) {
  const pizza = await Pizza.findOne({_id})
  const topping = await Topping.findOne({_id: toppingId})
  if (pizza && topping) {
    await Pizza.update({ _id,
      'toppings': { $ne: toppingId }
    }, { $push: { toppings: toppingId } })
    return {
      topping,
    }
  }
}

export async function removeTopping({ Pizza, Topping }, { config }, { _id, toppingId }) {
  const pizza = await Pizza.findOne({_id})
  const topping = await Topping.findOne({_id: toppingId})
  if (pizza && topping) {
    return Pizza.update({ _id,
    }, { $pull: { toppings: toppingId } })
  }
}
