import AuthController from "./components/auth/auth-controller.js";
import AuthService from "./components/auth/auth-service.js";

let auth = new AuthService()


class App {
  constructor() {
    this.controllers = {
      authController: new AuthController(auth)
    }
  }
}

window.app = new App()