let router = require('express').Router()
let Comments = require('../models/comment')



//look at comments for a log
router.get('/:logid', (req, res, next) => {
  Comments.find(req.params.logid)
    .then(comments => {
      res.send(comments)
    })
    .catch(next)
})


//post a comment
router.post('/:logid', (req, res, next) => {
  req.body.author = req.session.uid
  req.body.log = req.params.logid
  Comments.create(req.body)
    .then(comment => res.send(comment))
    .catch(next)
})
//delete a log




module.exports = router


