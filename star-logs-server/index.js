let express = require('express')
let server = express()
let bp = require('body-parser')
let cors = require('cors')
require('./server/db/mlab-config')

const PORT = process.env.PORT || 3000

let whitelist = ['http://localhost:8080']
let corsOptions = {
  origin: function (origin, callback) {
    let originIsWhitlisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitlisted)
  },
  credentials: true
}
server.use(cors(corsOptions))
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))


let auth = require('./server/auth/routes')
server.use(auth.session)
server.use('/account', auth.router)

server.use("*", (req, res, next) => {
  if (req.method == 'GET') {
    return next()
  }
  if (!req.session.uid) {
    return next(new Error("Please Login to Continue"))
  }
  if (req.method == 'POST') {
    req.body.creatorId = req.session.uid
  }
  next()
})



let ShipRoute = require('./server/routes/shiproutes')
let LogRoute = require('./server/routes/logRoutes')
let CommentRoute = require('./server/routes/commentRoutes')

server.use('/api/ships', ShipRoute)
server.use('/api/logs', LogRoute)
server.use('/api/comments', CommentRoute)

//defautl error handler
server.use('*', (error, req, res, next) => {
  res.status(error.status || 400).send({ message: error.message })
})




server.listen(PORT, () => {
  console.log('server is running on port:' + PORT)
})