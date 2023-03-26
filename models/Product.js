const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  processTime: {
    type: String,
    required: true,
  },
  category : {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('product', ProductSchema) // first argument is database name. automatically turns plural in MongoDB