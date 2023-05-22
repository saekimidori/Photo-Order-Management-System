const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const NoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  resolved: {
    type: Boolean,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  orderId: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('WorkspaceNote', NoteSchema) // first argument is database name. automatically turns plural in MongoDB