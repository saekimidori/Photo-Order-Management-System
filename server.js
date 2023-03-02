// declare variables
const express = require('express') // imports express
const app = express() // assigns express to app variable
const PORT = 5000 // port is assigned to 5000
const mongoose = require("mongoose")

// imports functions/routes
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const workspaceRoutes = require('./routes/workspace')

const methodOverride = require("method-override")
const bodyParser= require('body-parser')

// imports MongoDB client
// const MongoClient = require('mongodb').MongoClient 

// loads environment variables
require('dotenv').config({path: './config/.env'}) 

// connect to database
connectDB()

// // connects to database
// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         // logs the name of connected database to the console
//         console.log(`Connected to ${dbName} Database`) 
//         // assigns the client database to the variable db
//         db = client.db(dbName) 
//     })

// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))

// required to properly parse form POST requests - sending data
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// use forms for put / delete
app.use(methodOverride("_method"))

// Routes
app.use('/', homeRoutes)
app.use('/workspace', workspaceRoutes)

// start server
app.listen(process.env.PORT || PORT, ()=>{ // server tries to load on environment variable first; if not, then it will load on assigned port above (|| PORT)
    console.log(`Server running on port ${PORT}`) // logs the port that server is running on to the console
})