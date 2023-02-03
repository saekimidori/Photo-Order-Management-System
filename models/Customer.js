const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: false,
  }
  address: {
    type: String,
    required: false,
  }
})

module.exports = mongoose.model('customer', CustomerSchema) // first argument is database name. automatically turns plural in MongoDB