let _authService = {}


function drawUserLogin() {
  console.log('not logged in')
  document.getElementById('auth').innerHTML = `
  <form onsubmit="app.controllers.authController.login(event)">
    <input type="email" name="email" placeholder="email" required>
    <input type="password" name="password" placeholder="password" required>
    <button type="submit"> Login </button>
    </form>
    <p onclick="app.controllers.authController.showRegister()">Click to Register</p>
    
  `
}

function drawLogout() {
  console.log('logged in')
  document.getElementById('auth').innerHTML = `<button onclick="app.controllers.authController.logout()">Logout</button>`
}

function drawRegister() {

  //get ships and create tiny options templates

  let shipsTemplate = ""
  _authService.ships.forEach(ship => shipsTemplate += `<option value="${ship._id}">${ship.name}</option>`)

  document.getElementById('auth').innerHTML = `
  <form onsubmit="app.controllers.authController.register(event)" class="container card p-1">
  <div class="form-group">
    <label for="email">Email</label>
    <input class="form-control" type="email" name="email" placeholder="email" required>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input class="form-control" type="password" name="password" placeholder="password" required>
  </div>
  <div class="form-group">
    <label for="rank">Rank Number</label>
    <input class="form-control" type="number" name="rank" required>
  </div>
  <div class="form-group">
    <label for="assignment">Ship</label>
    <select class="form-control" name="assignment">
    ${shipsTemplate}
    </select>
    </div>

    <button type="submit"> Register </button>
    </form>
    <p onclick="app.controllers.authController.showLogin()">Existing User?</p>
  `
}

export default class AuthController {
  constructor(auth) {
    _authService = auth
    _authService.authenticate(drawLogout, drawUserLogin)
  }
  login(event) {
    event.preventDefault();
    let creds = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    _authService.login(creds, drawLogout)
  }
  register(event) {
    event.preventDefault();
    let creds = {
      rank: event.target.rank.value,
      assignment: event.target.assignment.value,
      email: event.target.email.value,
      password: event.target.password.value
    }
    _authService.register(creds, drawLogout)
  }
  logout() {
    _authService.logout(drawUserLogin)
  }
  showRegister() {
    drawRegister()
  }
  showLogin() {
    drawUserLogin()
  }
}