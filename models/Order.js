const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderTime: {
    type: String,
    required: true,
  },
  promiseTime: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('order', OrderSchema) // first argument is database name. automatically turns plural in MongoDB