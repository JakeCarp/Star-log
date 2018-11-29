let expressSession = require('express-session')
let mongoStore = require('connect-mongodb-session')(expressSession)

let store = new mongoStore({
  uri: 'mongodb://pickard:pickard1@ds038888.mlab.com:38888/star-log',
  collection: 'Sessions'
})

store.on('error', error => {
  console.error('[SESSION ERROR]', error)
})

let session = expressSession({
  secret: process.env.SESSIONSECRET || 'I like to whisper too',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365
  },
  store,
  resave: true,
  saveUninitialized: true
})



module.exports = session