const express = require('express') // imports express
const app = express() // assigns express to app variable
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(session) // TypeError: Class constructor MongoStore cannot be invoked without 'new' at Object.<anonymous>
const connectDB = require('./config/database')
// const todoRoutes = require('./routes/todos')
const MongoClient = require('mongodb').MongoClient // imports MongoDB client
const PORT = 6000 // port is assigned to 6000

require('dotenv').config({path: './config/.env'}) // loads environment variables
require('./config/passport')(passport)

connectDB()


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


// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: 
                             mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')

app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)


app.get('/', async (request, response) => {
    const todoItems = await db.collection('todos').find().toArray() // gets collection of documents and puts them into an array
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) // gets collection of documents that are not completed
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => { // creates a new todo
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false}) // adds one new item to collection and defaults to incomplete
    .then(result => {
        console.log('Todo Added') // logs 'Todo Added' to console
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

app.delete('/deleteItem', (request, response) => { // removes an item from collection
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) // removes body of todo item from collection
    .then(result => {
        console.log('Todo Deleted') // logs 'Todo Deleted' to console
        response.json('Todo Deleted') // returns json response as 'Todo Deleted'
    })
    .catch(error => console.error(error)) // catches error and logs error to console

})

app.listen(process.env.PORT || PORT, ()=>{ // server tries to loads on environment variable first; if not, then it will load on assigned port above
    console.log(`Server running on port ${PORT}`) // logs the port that server is running on to the console
})