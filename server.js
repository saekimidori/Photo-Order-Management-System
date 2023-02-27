const express = require('express') // imports express
const app = express() // assigns express to app variable
const connectDB = require('./config/database')
const methodOverride = require("method-override")
const bodyParser= require('body-parser')
const homeRoutes = require('./routes/home')
const workspaceRoutes = require('./routes/workspace')
// const MongoClient = require('mongodb').MongoClient // imports MongoDB client
const PORT = 5000 // port is assigned to 6000
const mongoose = require("mongoose");
require('dotenv').config({path: './config/.env'}) // loads environment variables

connectDB()



// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`) // logs the name of connected database to the console
//         db = client.db(dbName) // assigns the client database to the variable db
//     })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//Use forms for put / delete
app.use(methodOverride("_method"))


app.use('/', homeRoutes)
app.use('/workspace', workspaceRoutes)

app.listen(process.env.PORT || PORT, ()=>{ // server tries to load on environment variable first; if not, then it will load on assigned port above (|| PORT)
    console.log(`Server running on port ${PORT}`) // logs the port that server is running on to the console
})