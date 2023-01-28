const Note = require('../models/Note')
let db, // asigns db variable
    dbConnectionStr = process.env.DB_STRING, // passes the existing database connection string
    dbName = 'POMS' // assigns database name as 'POMS'

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    // getIndex: async (req,res)=>{
    //     try{
    //         const notes = await Note.find()
    //         // const itemsLeft = await Note.countDocuments({completed: false})
    //         res.render('workspace.ejs', {notes: notes})
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
}