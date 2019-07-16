import mongoose from 'mongoose'
const pizza = {
  name: String,
  createdAt: Date,
  updatedAt: Date,
  toppings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topping'
  }],
}


export default mongoose.Schema(pizza)
