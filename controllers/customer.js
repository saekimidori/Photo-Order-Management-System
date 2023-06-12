const Customer = require('../models/Customer')
const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

module.exports = {
    getCustomer: async (req,res)=>{
        const id = req.params.id
        console.log(id)
        const customer = await Customer.findById(id)
        const order = await Order.find({customer: customer}).sort({orderTime: 'desc'}).lean()
        const user = await User.findById({_id: req.user.id})
        try{
            res.render('customer.ejs', {
                customer: customer, 
                order: order,
                user: user})
        }catch(err){
            console.log(err)
        }
    },
    getCustomerEdit: async (req, res) => {
        const id = req.params.id
        const user = await User.findById({_id: req.user.id})
        const customer = await Customer.findById(id)
        const order = await Order.find({customer: customer}).sort({orderTime: 'desc'}).lean()
        try{
            res.render('editCustomer.ejs', {
                customer: customer,
                user: user,
                order: order})
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
            res.redirect(`/customer/${id}`)
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
                res.redirect(`/customer/${id}`)
                console.log('Customer updated')
        }catch(err){
            console.log(err)
        }
    },
}    