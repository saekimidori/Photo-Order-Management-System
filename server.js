// declare variables
const express = require('express') // imports express
const app = express() // assigns express to app variable
const PORT = 5000 // port is assigned to 5000
const mongoose = require("mongoose")
const passport = require('passport') // imports passport for authentication
const LocalStrategy = require('passport-local');

const strategy = new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  });
});

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

// registers passport strategy
passport.use(strategy)

// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
// passport authenticates request
app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });

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