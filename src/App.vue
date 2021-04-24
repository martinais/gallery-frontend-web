<template>
  <div>
    <HomePage v-if="user" :user="user" />
    <LoginPage v-else @authenticated="handleAuth"/>
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    LoginPage,
    HomePage
  },
  data() {
    return {
      user: undefined
    }
  },
  methods: {
    handleAuth(user) {
      this.user = user;
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
