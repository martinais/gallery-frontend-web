<template>
  <p>{{ test }}</p>
  <LoginPage msg="Welcome to The Martinade" @authenticated="handleAuth"/>
</template>

<script>
import LoginPage from './components/LoginPage.vue'

export default {
  name: 'App',
  components: {
    LoginPage
  },
  data() {
    return {
      test: 'Hello'
    }
  },
  methods: {
    handleAuth(token) {
      this.test = token;
      console.log(token);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
