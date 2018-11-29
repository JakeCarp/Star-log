let router = require('express').Router()
let Logs = require('../models/Log')

//get all
router.get('/', (req, res, next) => {
  Logs.find({ ship: req.session.assignment, rank: { $lt: req.session.rank++ } })
    .then(logs => {
      res.send(logs)
    })
    .catch(next)
})


//post
router.post('/', (req, res, next) => {
  req.body.ship = req.session.assignment
  req.body.author = req.session.uid
  req.body.rank = req.session.rank
  Logs.create(req.body)
    .then(log => res.send(log))
    .catch(next)
})


//delete
router.delete('/:id', (req, res, next) => {
  Logs.findById(req.params.id)
    .then(log => {
      if (log.author != req.session.uid) {
        res.status(401).send("Cannot delete logs that are not yours")
      }
      log.remove(() => {
        res.status(200).send("vaporized")
      })
    })
})

module.exports = router