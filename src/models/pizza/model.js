import mongoose from 'mongoose'
import schema from './schema'

const Pizza = mongoose.model('Pizza', schema)
export default Pizza
