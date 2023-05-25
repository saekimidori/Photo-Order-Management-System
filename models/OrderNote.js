const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const OrderNoteSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
      },
    note: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('OrderNote', OrderNoteSchema) // first argument is database name. automatically turns plural in MongoDB