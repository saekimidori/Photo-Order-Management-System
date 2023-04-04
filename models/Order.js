const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  orderId: {
    type: Number,
    required: false,
  },
  envelopeNum: {
    type: Number,
    required: false,
  },
  orderTime: {
    type: Date,
    required: true,
  },
  promiseTime: {
    type: Date,
    required: true,
  },
  completed: {
    type: Date,
    required: false,
  },
  sold: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  details: {
    type: Array,
    required: true,
  },
  // quantity: {
  //   type: String,
  //   required: true,
  // },
})

module.exports = mongoose.model('order', OrderSchema) // first argument is database name. automatically turns plural in MongoDB