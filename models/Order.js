const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const OrderSchema = new mongoose.Schema({
  customer: {
    type: Object,
    required: true,
  },
  orderId: {
    type: Number,
    required: false,
  },
  envelopeNum: {
    type: Number,
    minlength: 6,
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
    type: Object,
    required: true,
  },
  // quantity: {
  //   type: String,
  //   required: true,
  // },
  price: {
    type: Number,
    required: false, //true
  },
  pricePaid: {
    type: Number,
    required: false,
  },
})

module.exports = mongoose.model('order', OrderSchema) // first argument is database name. automatically turns plural in MongoDB