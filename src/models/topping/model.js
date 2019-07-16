import mongoose from 'mongoose'
import schema from './schema'

const Topping = mongoose.model('Topping', schema)
export default Topping
