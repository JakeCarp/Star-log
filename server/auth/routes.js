let router = require('express').Router()
let Users = require('../models/user')
let session = require('./session')

//login
router.post('/login', (req, res, next) => {
  Users.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return next(new Error("Invalid Username or Password"))
    }
    if (!user.validatePassword(req.body.password)) {
      return next(new Error("Invalid Username or Password"))
    }
    delete user._doc.hash
    req.session.uid = user._id
    req.session.rank = user.rank
    req.session.assignment = user.assignment
    res.send(user)
  })
    .catch(next)
})

//register
router.post('/register', (req, res, next) => {
  //@ts-ignore
  let hash = Users.hashpassword(req.body.password)
  Users.create({ email: req.body.email, hash, rank: req.body.rank, assignment: req.body.assignment })
    .then(user => {
      delete user._doc.hash
      req.session.uid = user._id
      req.session.rank = user.rank
      req.session.assignment = user.assignment
      res.send(user)
    })
    .catch(err => {
      next(new Error("Invalid Username or Password"))
    })
})


router.delete('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return next(err)
    }
    return res.send({ message: "Successfully logged out" })
  })
})


//authenticate the session token
router.get('/authenticate', (req, res, next) => {
  if (!req.session.uid) {
    return next(new Error("Invalid Credentials"))
  }
  Users.findById(req.session.uid)
    .then(user => {
      delete user._doc.hash
      res.send(user)
    })
    .catch(err => next(new Error("Invalid credentials")))
})

module.exports = { router, session }