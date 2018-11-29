let router = require('express').Router()
let Ships = require('../models/Ship')

//get all
router.get('/', (req, res, next) => {
  Ships.find({})
    .then(ships => res.send(ships))
    .catch(next)
})

//get one
router.get('/:id', (req, res, next) => {
  Ships.findById(req.params.id)
    .then(ship => res.send(ship))
    .catch(next)
})

//post
router.post('/', (req, res, next) => {
  Ships.create(req.body)
    .then(ship => res.send(ship))
    .catch(next)
})


//delete
router.delete('/:id', (req, res, next) => {
  Ships.findByIdAndDelete(req.params.id)
    .then(ship => res.send({ message: "ship was destroyed by BORG/Klingons" }))
    .catch(next)
})

module.exports = router