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
  date: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('WorkspaceNote', NoteSchema)