const Note = require('../models/Note')
const OrderNote = require('../models/OrderNote')
const Customer = require('../models/Customer')
const Order = require('../models/Order')

module.exports = {
    addWorkspaceNote: async (req, res)=>{
        try{
            await Note.create({
                note: req.body.workspaceNote,
                resolved: false,
                user: req.user.username
            })
            console.log('Note has been added!')
            res.redirect('/workspace')
        }catch(err){
            console.log(err)
        }
    },
    markResolved: async (req, res)=>{
        const id = req.params.id
        try{
            await Note.findByIdAndUpdate(id,
                {
                    resolved: true
                })
                res.redirect('back')
                console.log('Note marked Resolved')
        }catch(err){
            console.log(err)
        }
    },
    updateNote: async (req, res) => {
        const id = req.params.id
        try{
            await Note.findByIdAndUpdate(id,
                {
                    note: req.body.updatedNote
                })
                res.redirect('/workspace')
                console.log('Updated note')
        }catch(err){
            console.log(err)
        }
      },
    deleteNote: async (req, res)=>{
        const id = req.params.id
        try{
            await Note.findByIdAndDelete(id)
            res.redirect('back')
            console.log('Deleted Note')
        }catch(err){
            console.log(err)
        }
    },
    getEdit: async (req, res) => {
        const id = req.params.id
        const order = await Order.find({status: 'PROC'}) // finds orders in Order database that are in PROCESSING status
        const customerId = order.customerId
        const customer = await Customer.find({id: customerId})
        try{
            const workspaceNotes = await Note.find().sort({ createdOn: 'desc' }).lean()
            res.render('edit.ejs', {
                order: order,
                customer: customer,
                workspaceNotes: workspaceNotes,
                noteId: id})
        }catch(err){
            console.log(err)
        }
    },
    getHistory: async (req,res)=>{
        try{
            const workspaceNotes = await Note.find().sort({ createdOn: 'desc' }).lean()
            res.render('history.ejs', {workspaceNotes: workspaceNotes})
        }catch(err){
            console.log(err)
        }
    },
    addOrderNote: async (req, res)=>{
        const id = req.params.id // does not grab order id
        console.log(id)
        try{
            await OrderNote.create({
                orderId: id,
                note: req.body.orderNote,
                user: req.user.username
            })
            console.log('Note has been added!')
            res.redirect('back')
        }catch(err){
            console.log(err)
        }
    },
}