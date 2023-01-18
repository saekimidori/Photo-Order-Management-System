const express = require('express') // imports express
const app = express() // assigns express to app variable
const connectDB = require('./config/database')
const MongoClient = require('mongodb').MongoClient // imports MongoDB client
const PORT = 5000 // port is assigned to 6000
require('dotenv').config({path: './config/.env'}) // loads environment variables


let db, // asigns db variable
    dbConnectionStr = process.env.DB_STRING, // passes the existing database connection string
    dbName = 'POMS' // assigns database name as 'POMS'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`) // logs the name of connected database to the console
        db = client.db(dbName) // assigns the client database to the variable db
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',async (request, response)=>{
    const workspaceNotes = await db.collection('workspaceNotes').find().toArray() // gets collection of documents and puts them into an array
    // const itemsLeft = await db.collection('todos').countDocuments({completed: false}) // gets collection of documents that are not completed
    response.render('index.ejs', { notes: workspaceNotes }) // originally index.ejs
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addWorkspaceNote', (request, response) => {
     // creates a new workspace note
    db.collection('workspaceNotes').insertOne({note: request.body.workspaceNote, resolved: false, date: new Date()}) // adds one new note to collection and defaults to unresolved 
    // ** add logged in user as identifier to note
    .then(result => {
        console.log('Workspace Note Added') // logs 'Workspace Note Added' to console
        response.redirect('/') // refreshes page
    })
    .catch(error => console.error(error)) // catches error and logs error to console
})

app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete') // logs 'Marked Complete' to console
        response.json('Marked Complete') // returns json response as 'Marked Complete'
    })
    .catch(error => console.error(error)) // catches error and logs error to console

})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete') // logs 'Marked Complete' to console
        response.json('Marked Complete') // returns json response as 'Marked Complete'
    })
    .catch(error => console.error(error)) // catches error and logs error to console

})

app.delete('/deleteItem', (request, response) => {
    db.collection('workspaceNotes').deleteOne({note: request.body.itemFromJS})
    .then(result => {
        console.log('Note Deleted')
        response.json('Note Deleted')
    })
    .catch(error => console.error(error))

})
// app.delete('/deleteNote', (request, response) => { // removes an item from collection
//     db.collection('workspaceNotes').deleteOne({note: request.body.noteFromJS}) // removes body of todo item from collection
//     .then(result => {
//         console.log('Note Resolved') // logs 'Todo Deleted' to console
//         response.json('Note Resolved')
//         response.redirect('/') // returns json response as 'Todo Deleted'
//     })
//     .catch(error => console.error(error)) // catches error and logs error to console

// })

app.listen(process.env.PORT || PORT, ()=>{ // server tries to loads on environment variable first; if not, then it will load on assigned port above (|| PORT)
    console.log(`Server running on port ${PORT}`) // logs the port that server is running on to the console
})