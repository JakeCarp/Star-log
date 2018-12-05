<template>
  <div>
    <form @submit.prevent="register">
      <input type="number" v-model="creds.rank" placeholder="rank">
      <input type="text" v-model="creds.email" placeholder="email">
      <input type="password" v-model="creds.password" placeholder="password">
      <input type="assignment" v-model="creds.assignment" placeholder="assignment">
      <button type="submit">Register</button>
      <button type="reset">CLEAR</button>
    </form>
  </div>
</template>


<script>
  export default {
    name: 'RegisterForm',
    data() {
      return {
        creds: {
          email: '',
          password: '',
          rank: 0,
          assignment: ''
        }
      }
    },
    methods: {
      register() {
        this.$store.dispatch('register', this.creds)
      }
    }
  }
</script>