const Note = require('../models/Note')

module.exports = {
    // getWorkspace: async (req,res)=>{
    //     try{
    //         // const workspaceNotes = await db.collection('workspaceNotes').find().toArray() // gets collection of documents and puts them into an array
    //         // const notes = await Note.find()
    //         // const itemsLeft = await Note.countDocuments({completed: false})
    //         res.render('workspace.ejs')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    getWorkspace: async (req,res)=>{
        try{
            // const workspaceNotes = await db.collection('workspaceNotes').find().toArray() // gets collection of documents and puts them into an array
            const notes = await Note.find()
            // const itemsLeft = await Note.countDocuments({completed: false})
            res.render('workspace.ejs', {notes: notes})
        }catch(err){
            console.log(err)
        }
    },
    // app.post('/addWorkspaceNote', (request, response) => {
//      // creates a new workspace note
//     db.collection('workspaceNotes').insertOne({note: request.body.workspaceNote, resolved: false, date: new Date()}) // adds one new note to collection and defaults to unresolved 
//     // ** add logged in user as identifier to note
//     .then(result => {
//         console.log('Workspace Note Added') // logs 'Workspace Note Added' to console
//         response.redirect('/') // refreshes page
//     })
//     .catch(error => console.error(error)) // catches error and logs error to console
// })
    addWorkspaceNote: async (req, res)=>{
        try{
            await Note.create({note: req.body.workspaceNote, resolved: false, date: new Date()})
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
    updateNote: async (req, res)=>{
        try{
            await Note.findOneAndUpdate({_id:req.body.itemFromJS},{
                note: req.body.itemFromJS
            })
            console.log('Note edited')
            res.json('Note edited')
        }catch(err){
            console.log(err)
        }
    },
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