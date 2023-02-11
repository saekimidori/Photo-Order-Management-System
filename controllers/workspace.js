const Note = require('../models/Note')

module.exports = {
    getWorkspace: async (req,res)=>{
        try{
            // const workspaceNotes = await db.collection('workspaceNotes').find().toArray() // gets collection of documents and puts them into an array
            const notes = await Note.find().sort({ createdOn: 'desc' }).lean()
            // const itemsLeft = await Note.countDocuments({completed: false})
            res.render('workspace.ejs', {notes: notes})
        }catch(err){
            console.log(err)
        }
    },
    search: async (req,res)=>{
        try{
            // const workspaceNotes = await db.collection('workspaceNotes').find().toArray() // gets collection of documents and puts them into an array
            const notes = await Note.find()
            // const itemsLeft = await Note.countDocuments({completed: false})
            res.render('search-results.ejs', {notes: notes})
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
        try{
            await Note.findOneAndUpdate({_id:req.body.itemFromJS},{
                resolved: true
            })
            console.log('Marked Resolved')
            res.json('Marked Resolved')
        }catch(err){
            console.log(err)
        }
    },
    updateNote: async (req, res) => {
        Note.findOneAndUpdate(
            {id: req.params.id},
            {
                $set: {
                note: req.body.updatedNote
                }
            },
            // {
            //     upsert: true
            // }
        
        )
            .then(result => {
                res.json('Success')
            })
            .catch(error => console.error(error))
      },
    // // Find a single note with a noteId
    // findOne: async (req, res) => {
    //     Note.findById(req.params.noteId)
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
    //             message: "Error retrieving note with id " + req.params.noteId
    //         });
    //     });
    // },
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
        console.log(req.body.itemFromJS)
        try{
            await Note.findOneAndDelete({_id:req.body.itemFromJS})
            console.log('Deleted Note')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    