import mongoose from 'mongoose'
const pizza = {
  name: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
  toppings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topping'
  }],
}
const PizzaSchema = mongoose.Schema(pizza)
PizzaSchema.path('name').validate(name => {
  return name && name.length >= 3
}, 'Name must be at least 3 characters')

export default PizzaSchema
