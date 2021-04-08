<template>
  <div class="hello">
    <h1>Welcome to The Martinade</h1>
    <form v-on:submit="handleSubmit">
      <input v-if="!emailed" v-model="userName" placeholder="username" type="text">
      <input v-if="emailed" v-model="pinCode" placeholder="XXX-XXX-XXX" type="text">
      <input type="submit"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  props: {
    msg: String,
  },
  data() {
    return {
      userName: '',
      pinCode: '',
      emailed: false
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (!this.emailed) {
        if (this.userName == 'tristan') { // TODO query api /login
          this.emailed = true;
        } else {
          this.userName = '';
          // TODO : error message
        }
      } else {
        if (this.pinCode == '000000000') { // TODO query api /token
          let user = {
            name: this.userName,
            token: 'token_1000'
          }
          this.$emit('authenticated', user); // TODO send token
        } else {
          this.pinCode = '';
          // TODO : error message
        }
      }
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
