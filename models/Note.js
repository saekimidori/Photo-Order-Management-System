const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const NoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  resolved: {
    type: Boolean,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('WorkspaceNote', NoteSchema) // first argument is database name. automatically turns plural in MongoDB