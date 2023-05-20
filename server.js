// declare variables
const express = require('express') // imports express
const app = express() // assigns express to app variable
const PORT = 5000 // port is assigned to 5000
const mongoose = require("mongoose") // imports mongoose
const passport = require('passport') // imports passport for authentication
const session = require('express-session') // allows for user sessions
const MongoStore = require('connect-mongo') // stores user sessions in the database
const flash = require('express-flash') // shows error messages for validation during authentication
const logger = require('morgan') // logs error messages during authentication
// const LocalStrategy = require('passport-local');
// const crypto = require('crypto');

// const strategy = new LocalStrategy(function verify(username, password, cb) {
//   db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
//     if (err) { return cb(err); }
//     if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, user);
//     });
//   });
// });

// imports database connection and routes
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const workspaceRoutes = require('./routes/workspace')
const customerRoutes = require('./routes/customer')
const orderRoutes = require('./routes/order')
const noteRoutes = require('./routes/note')

const methodOverride = require("method-override")
const bodyParser= require('body-parser')

// imports MongoDB client
// const MongoClient = require('mongodb').MongoClient 

// loads environment variables
require('dotenv').config({path: './config/.env'}) 

// Passport config
require('./config/passport')(passport)

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
// passport.use(strategy)

// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
// required to properly parse form POST requests - sending data; allows to read requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// use forms for put / delete
app.use(methodOverride("_method"))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// // passport authenticates request
// app.post('/login/password',
//   passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
//   function(req, res) {
//     res.redirect('/~' + req.user.username);
//   });
// // supports user sessions
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true }
//   }));

// // renders login page to authenticate user
// app.get('/login',
//   function(req, res, next) {
//     res.render('login');
//   });
// // authenticates user
// app.post('/login/password',
//   passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
//   function(req, res) {
//     res.redirect('/~' + req.user.username);
//   });

// Routes
app.use('/', homeRoutes)
app.use('/workspace', workspaceRoutes)
app.use('/customer', customerRoutes)
app.use('/order', orderRoutes)
app.use('/note', noteRoutes)

// start server
app.listen(process.env.PORT || PORT, ()=>{ // server tries to load on environment variable first; if not, then it will load on assigned port above (|| PORT)
    console.log(`Server running on port ${PORT}`) // logs the port that server is running on to the console
})