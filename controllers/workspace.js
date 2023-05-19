const Note = require('../models/Note')
const Customer = require('../models/Customer')
const Order = require('../models/Order')
const Product = require('../models/Product')

// function to convert date to m/d/yyyy, h:mm:ss AM in America/New York time zone
const formatDate = date => {
    date.toLocaleString('en-US', { timeZone: 'America New_York'})
    }

module.exports = {
    getWorkspace: async (req,res)=>{
        try{
            const order = await Order.find({status: 'PROC'}).sort({ orderTime: 'desc' }).lean() // finds orders in Order database that are in PROCESSING status
            // console.log(order) // array of objects
            
            const workspaceNotes = await Note.find().sort({ createdOn: 'desc' }).lean()
            res.render('workspace.ejs', {
                order: order,
                workspaceNotes: workspaceNotes,
            })
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
    search: async (req,res)=>{
        try{
            const filter = req.query.filter // should handle lowercases
            // console.log(filter)
            let result = await Customer.find(
                // {lastName: {$eq: filter}}
            //     // { type: 1 } ).collation( { locale: 'en', strength: 2 }
                { lastName: filter })
                .collation({ locale: "en", strength: 2 }
            )
            // aggregation
            // let result = await Customer.aggregate(
            //     [
            //       { $group: { lastName: filter } }
            //     ], 
            //     { type: 1 }, {collation: { locale: "en", strength: 2 } })
            console.log(result)
            // console.log(result.lastName)

            if (result.length === 0) {
                result = null
            }
            res.render('search-results.ejs', {filter: filter, result: result})
        }catch(err){
            console.log(err)
        }
    },
    addWorkspaceNote: async (req, res)=>{
        try{
            await Note.create({note: req.body.workspaceNote, resolved: false})
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
    // creates a new product
    newProduct: async (req, res)=>{
        try{
            const newProduct = await Product.create({
                name: req.body.product,
                processTime: req.body.processTime,
                price: req.body.price,
            })
            console.log('Product has been created!')
            res.redirect('/workspace')
        }catch(err){
            console.log(err)
        }
    },
}    