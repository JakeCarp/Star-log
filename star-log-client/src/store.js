import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'


let auth = axios.create({
  baseURL: "//localhost:3000/account",
  withCredentials: true
})
let api = axios.create({
  baseURL: "//localhost:3000/api",
  withCredentials: true
})


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
    },
  },
  mutations: {
    SETUSER(state, user) {
      state.user = user

    }
  },
  actions: {
    login({ commit }, creds) {
      auth.post('login', creds)
        .then(res => commit('SETUSER', res.data))
        .catch(err => alert(err))
    },
    register({ commit }, creds) {
      auth.post('register', creds)
        .then(res => commit('SETUSER', res.data))
        .catch(err => alert(err))
    },
    authenticate({ commit }) {
      auth.get('authenticate')
        .then(res => commit('SETUSER', res.data))
        .catch(err => {
          router.push({ name: 'auth' })
        })
    }
  }
})
