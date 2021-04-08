<template>
  <div class="hello">
    <h1>Welcome to The Martinade</h1>
    <form v-on:submit="handleSubmit">
      <input v-if="!emailed" v-model="userName" placeholder="username"
             type="text">
      <input v-if="emailed" v-model="pinCode" placeholder="XXXX-XXXX"
             type="text">
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
      if (!this.emailed) this.login();
      else this.access();
    },
    login() {
      fetch(process.env.VUE_APP_BACKEND_URL + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'name':this.userName})
      }).then(this.emailed = true);
    },
    access() {
      fetch(process.env.VUE_APP_BACKEND_URL + '/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'code':this.pinCode})
      }).then(data => {
        if (data.status == 201) {
          console.log("LOGIN SUCCESS");
          data.json().then(data => {
            this.$emit('authenticated', {
              name: this.userName,
              token: data.access_token
            });
          });
        } else {
          console.log("LOGIN FAILURE");
          // TODO : show error
        }
      });
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
