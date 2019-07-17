import mongoose from 'mongoose'

const topping = {
  name: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
}

const ToppingSchema = mongoose.Schema(topping)

ToppingSchema.path('name').validate(name => {
  return name && name.length >= 3
}, 'Name must be at least 3 characters')


ToppingSchema.pre('save', function (next) {
  this.createdAt = new Date()
  this.updatedAt = new Date()
  next()
});

export default ToppingSchema
