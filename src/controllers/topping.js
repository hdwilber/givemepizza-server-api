import _pick from 'lodash/pick'

export async function list( { Topping }, { config }, data) {
  let { limit, skip, search } = data
  skip = skip ? parseInt(skip, 10) : 0;
  limit = limit ? parseInt(limit, 10) : 100;

  const query = {};
  const toppings = await Topping.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });

  return {
    toppings,
  }
}

export async function create({ Topping }, { config } , body) {
  const data = _pick(body, ['name'])
  const topping = await Topping.create(data)
  return {
    topping,
  }
}
export function remove({ Topping }, { config } , _id) {
  return Topping.deleteOne({ _id, })
}
