const Customer = require('../models/Customer')

module.exports = {
    getCustomer: async (req,res)=>{
        const id = req.params.id
        try{
            const customer = await Customer.findById(id)
            res.render('customer.ejs', {customer: customer})
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
            await Customer.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address
            })
            console.log('Customer has been added!')
            res.redirect('/customer/:id')
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