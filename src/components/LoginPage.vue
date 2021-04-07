<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form v-on:submit="doLogin">
      <input v-model="username" placeholder="username" type="text">
      <input type="submit"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  props: {
    msg: String,
    logged: Boolean
  },
  data() {
    return {
      username: 'coucou'
    }
  },
  methods: {
    doLogin(e) {
      e.preventDefault();
      console.log(this.username);
      this.$emit('authenticated', this.username);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
