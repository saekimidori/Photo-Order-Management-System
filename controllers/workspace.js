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
                user: req.user.username
            })
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