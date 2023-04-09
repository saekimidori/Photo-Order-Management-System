const Note = require('../models/Note')
const Customer = require('../models/Customer')
const Order = require('../models/Order')
const Product = require('../models/Product')

module.exports = {
    getWorkspace: async (req,res)=>{
        try{
            const id = req.params.id
            const customer = await Customer.find() // finds customers in Customer database
            const workspaceNotes = await Note.find().sort({ createdOn: 'desc' }).lean()
            res.render('workspace.ejs', {
                workspaceNotes: workspaceNotes,
                customer: customer
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
        try{
            const workspaceNotes = await Note.find().sort({ createdOn: 'desc' }).lean()
            res.render('edit.ejs', {workspaceNotes: workspaceNotes, noteId: id})
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
                result = 'none'
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
        // console.log(req.body.itemFromJS)
        try{
            await Note.findByIdAndUpdate(id,
                {
                    resolved: true
                })
                res.redirect('back')
                console.log('Marked Resolved')
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
    // customer controllers
    // ideally, this should not be here
    getCustomer: async (req,res)=>{
        const id = req.params.id
        const order = await Order.find({customerId: id})
        try{
            console.log(id)
            const customer = await Customer.findById(id)
            res.render('customer.ejs', {customer: customer, order: order})
        }catch(err){
            console.log(err)
        }
    },
    getCustomerEdit: async (req, res) => {
        const id = req.params.id
        try{
            const customer = await Customer.findById(id)
            res.render('editCustomer.ejs', {customer: customer})
        }catch(err){
            console.log(err)
        }
    },
    newCustomer: async (req, res)=>{
        try{
            const newCustomer = await Customer.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address
            })
            const id = newCustomer.id
            console.log('Customer has been added!')
            res.redirect(`/workspace/customer/${id}`)
        }catch(err){
            console.log(err)
        }
    },
    updateCustomer: async (req, res) => {
        const id = req.params.id
        try{
            await Customer.findByIdAndUpdate(id,
                {
                    firstName: req.body.updatedFirstName,
                    lastName: req.body.updatedLastName,
                    phone: req.body.updatedPhone,
                    email: req.body.updatedEmail,
                    address: req.body.updatedAddress
                })
                res.redirect(`/workspace/customer/${id}`)
                console.log('Customer updated')
        }catch(err){
            console.log(err)
        }
    },
    newOrder: async (req,res)=>{
        const id = req.params.id
        try{
            console.log('customer id: ', id)
            const customer = await Customer.findById(id)
            const product = await Product.find()
            res.render('new-order.ejs', {customer: customer, product: product})
        }catch(err){
            console.log(err)
        }
    },
    submitOrder: async (req, res)=>{
        const customerId = req.params.id
        let order = {}
        if (req.body.quantity > 0) {
            order = {
                product: req.body.product,
                quantity: req.body.quantity
            }
        }
        console.log(order)
        try{
            // let product = Product.product
            function newEnvelope() {
                let envelopeNum = Math.floor(Math.random()*999999)
                if (Order.find({envelopeNum: envelopeNum})) {
                    console.log('envelope match')
                    // console.log(envelopeNum)
                    // newEnvelope() // infinite loop
                    return envelopeNum
                    // console.log(envelopeNum)
                } else {
                    console.log('no envelope match')
                    return envelopeNum
                }
            }
            const newOrder = await Order.create({
                customerId: customerId,
                orderId: 0,
                envelopeNum: newEnvelope(),
                orderTime: Date.now(),
                promiseTime: Date.now(), // needs to be changed
                status: 'PROC',
                details: req.body.quantity,
                // quantity: req.body.quantity
            })
            const orderId = newOrder.id
            console.log(newOrder)
            // console.log(Date.now())
            console.log('Order has been submitted!')
            res.redirect(`/workspace/getOrder/${orderId}`)
            // res.redirect(`/workspace/customer/${id}/order/${id}`)
        }catch(err){
            console.log(err)
        }
    },
    getOrder: async (req,res)=>{
        const id = req.params.id
        console.log('order id: ' + id)
        const order = await Order.findById(id)
        const customerId = order.customerId
        console.log('customer id: ' + customerId)
        const customer = await Customer.findById(customerId)
        console.log(customer)
        try{
            res.render('order-details.ejs', {order: order, customer: customer})
        }catch(err){
            console.log(err)
        }
    },
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