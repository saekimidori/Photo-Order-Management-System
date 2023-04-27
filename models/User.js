const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  role: {
    type: String,
    default: 'Basic',
    required: true,
  }
})

module.exports = mongoose.model('product', UserSchema) // first argument is database name. automatically turns plural in MongoDB