const Customer = require('../models/Customer')
const Order = require('../models/Order')
const Product = require('../models/Product')

module.exports = {
    getOrder: async (req,res)=>{
        const id = req.params.id
        const order = await Order.findById(id)
        const customerId = order.customerId
        const customer = await Customer.findById(customerId)
        try{
            res.render('order-details.ejs', {order: order, customer: customer, user: req.user.username})
        }catch(err){
            console.log(err)
        }
    },
    newOrder: async (req,res)=>{
        const id = req.params.id
        try{
            const customer = await Customer.findById(id)
            const product = await Product.find()
            res.render('new-order.ejs', {customer: customer, product: product})
        }catch(err){
            console.log(err)
        }
    },
    submitOrder: async (req, res)=>{
        const customerId = req.params.id
        console.log('customerId: ' + customerId)

        console.log(req.body.product)
        // let order = {}
        // if (req.body.quantity > 0) {
        //     order = {
        //         product: req.body.product,
        //         quantity: req.body.quantity
        //     }
        // }
        // console.log('order: ' + order)
        try{
            // let product = Product.product

            // function to generate new envelope number
            function newEnvelope() {
                let envelopeNum = Math.floor(Math.random()*999999)
                if (Order.find({envelopeNum: envelopeNum})) {
                    console.log(envelopeNum)
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

            const customer = await Customer.findById(customerId)
            console.log(customer)
            // creates new order in database
            const newOrder = await Order.create({
                customer: customer,
                orderId: 0,
                envelopeNum: newEnvelope(),
                orderTime: Date.now(),
                promiseTime: Date.now(), // needs to be changed
                status: 'PROC',
                details: {
                    product: req.body.product
                },
                // quantity: req.body.quantity
            })
            const orderId = newOrder.id
            console.log(newOrder)
            console.log('Order has been submitted!')
            res.redirect(`/order/${orderId}`)
        }catch(err){
            console.log(err)
        }
    },
    markDone: async (req, res)=>{
        const id = req.params.id
        try{
            await Order.findByIdAndUpdate(id,
                {
                    status: 'DONE',
                    completed: Date.now(),
                })
                res.redirect('back')
                console.log('Order marked DONE')
        }catch(err){
            console.log(err)
        }
    },
}