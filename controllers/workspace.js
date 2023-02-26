const Note = require('../models/Note')
const Customer = require('../models/Customer')

module.exports = {
    getWorkspace: async (req,res)=>{
        try{
            // const workspaceNotes = await db.collection('workspaceNotes').find().toArray() // gets collection of documents and puts them into an array
            const workspaceNotes = await Note.find().sort({ createdOn: 'desc' }).lean()
            // const itemsLeft = await Note.countDocuments({completed: false})
            res.render('workspace.ejs', {workspaceNotes: workspaceNotes})
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
            let result = await Customer.find({
                firstName: {$eq: filter}
            })
            if (result.length === 0) {
                result = 'none'
            }
            res.render('search-results.ejs', {filter: filter, result: result})
        }catch(err){
            console.log(err)
        }
    },
    getCustomer: async (req,res)=>{
        const id = req.params.id
        try{
            const customer = await Customer.findById(id)
            res.render('customer.ejs', {customer: customer})
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
    // Find a single note with a noteId
    
    // updateNote: async (req, res) => {
    //     // Validate Request
    //     if(!req.body.updatedNote) {
    //         return res.status(400).send({
    //             message: "Note content can not be empty"
    //         });
    //     }
    
    //     // Find note and update it with the request body
    //     Note.findByIdAndUpdate(req.params.noteId, {
    //         note: req.body.updatedNote
    //     }, {new: true})
    //     .then(note => {
    //         if(!note) {
    //             return res.status(404).send({
    //                 message: "Note not found with id " + req.params.noteId
    //             });
    //         }
    //         res.send(note);
    //     }).catch(err => {
    //         if(err.kind === 'ObjectId') {
    //             return res.status(404).send({
    //                 message: "Note not found with id " + req.params.noteId
    //             });                
    //         }
    //         return res.status(500).send({
    //             message: "Error updating note with id " + req.params.noteId
    //         });
    //     });
    // },
    // updateNote: async (req, res)=>{
    //     // console.log(req)
    //     console.log(req.body)
    //     console.log(req.params)
    //     console.log(req.body.itemFromJS)
    //     console.log(req.body.updatedNote)
    //     // const note = await Note.findById(req.params.id)

    //     try{
    //         await Note.findOneAndUpdate({_id: req.params.id},{
    //             $set: {note: req.body.updatedNote}
    //         }, 
    //         // { new: true },
    
    //         // the callback function
    //         (err, note) => {
    //         // Handle any possible database errors
    //             if (err) return res.status(500).send(err);
    //             return res.send(note);
    //         }
    //         )
    //         console.log('Note edited')
    //         res.json('Note edited')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Note.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    deleteNote: async (req, res)=>{
        const id = req.params.id
        try{
            await Note.findByIdAndDelete(id)
            res.redirect('back')
            console.log('Deleted Note')
        }catch(err){
            console.log(err)
        }
    }
}    