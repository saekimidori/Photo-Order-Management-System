const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const OrderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  }
})

module.exports = mongoose.model('order', OrderSchema) // first argument is database name. automatically turns plural in MongoDB