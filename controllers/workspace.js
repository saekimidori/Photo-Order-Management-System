const Note = require('../models/Note')
const Customer = require('../models/Customer')

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
                {firstName: {$eq: filter}}
                // { type: filter } ).collation( { locale: 'en', strength: 2 }
            )
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