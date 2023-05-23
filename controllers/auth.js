const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/workspace')
    }
    res.render('login', {
      title: 'Login'
    })
}

exports.postLogin = async (req, res, next) => {
    const validationErrors = []
    // checks if username field is empty
    if (validator.isEmpty(req.body.username)) validationErrors.push({ msg: 'Please enter a valid username.' })
    // checks if password field is empty
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

    // displays login errors if any, redirects to login page
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/workspace')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/workspace')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    // checks if username field is empty
    if (validator.isEmpty(req.body.username)) validationErrors.push({ msg: 'Please enter a valid username.' })
    // checks if password has minimum required length
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    // checks if passwords match
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    // displays sign up errors if any, redirects to sign up page
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
  
    // creates new user
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
  
    // finds if username already exists in database
    User.findOne({userName: req.body.userName}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        // displays error if username exists
        req.flash('errors', { msg: 'Username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/workspace')
        })
      })
    })
}