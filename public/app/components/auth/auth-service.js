let _auth = axios.create({
  baseURL: '/account',
  withCredentials: true,
  timeout: 3000
})
let _ship = axios.create({
  baseURL: '/api/ships'
})
let _user = {}
let _ships = []

function _getShips() {
  _ship.get()
    .then(res => {
      _ships = res.data
    })
    .catch(err =>
      console.error(err))
}
export default class AuthService {
  constructor() {
    _getShips()

  }
  get ships() {
    return _ships
  }
  get user() {
    return _user
  }

  login(creds, draw) {
    _auth.post('login', creds)
      .then(res => {
        _user = res.data
      })
      .catch(err => {
        console.error(err)
      })
  }

  register(creds, draw) {
    debugger
    _auth.post('register', creds)
      .then(res => {
        _user = res.data
        draw()
      })
      .catch(err => {
        console.error(err)
      })
  }

  authenticate(drawOnSuccess, drawOnFail) {
    _auth.get('authenticate')
      .then(res => {
        _user = res.data
        drawOnSuccess()
      })
      .catch(err => {
        console.error(err)
        drawOnFail()
      })
  }

  logout(draw) {
    _auth.delete('logout')
      .then(res => {
        _user = {}
        draw()
      })
      .catch(err => {
        console.error(err)
      })
  }
}