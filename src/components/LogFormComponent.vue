<template>
  <div class="logform">
    <div class="formbox">
      <h1>Log In</h1>
      <form v-on:submit.prevent="handleSubmit">
        <input :class="{ softInput: emailed }" :disabled="emailed"
            v-model="userName" placeholder="Enter your Pseudo"
            type="text" id="pseudoField" >
        <input v-if="emailed" v-model="pinCode"
          placeholder="Enter the mail code" type="text">
        <button type="submit">{{ submitMsg }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { httpNoAuth } from '../helpers/http.js'
export default {
  name: 'LogForm',
  data() {
    return {
      userName: '',
      pinCode: '',
      emailed: false,
      submitMsg: 'Mail me my code'
    }
  },
  methods: {
    handleSubmit() {
      if (!this.emailed) this.login();
      else this.access();
    },
    login() {
      httpNoAuth('POST', '/login', {'name':this.userName}).then(() => {
        this.emailed = true;
        this.submitMsg = 'Connect me !';
      });
    },
    access() {
      if (this.pinCode) {
        httpNoAuth('POST', '/token', {'code':this.pinCode}).then(data => {
          if (data.status == 201) {
            console.log("LOGIN SUCCESS");
            data.json().then(data => {
              localStorage.setItem("user", JSON.stringify({
                name: this.userName,
                token: data.access_token
              }));
              this.$emit('authenticated');
            });
          } else {
            console.log("LOGIN FAILURE");
            // TODO : show error
          }
        });
      }
    }
}
}
</script>

<style scoped>
  .formbox {
    max-width: 500px;
    background-color: #FCE0E0;
    border-radius: 15px;
    padding: 2em;
    text-align: center;
  }
  h1 {
    margin: 0.4em 0;
    font-size: 3em;
    font-weight: normal;
  }
  input, button {
    outline: none;
    border-style: hidden;
    width: 80%;
    margin: 2em auto;
    padding: 1em;
    display: block;
    background: #FCE0E0;
    font-size: 1em;
  }
  input {
    border-radius: 30px;
    box-shadow: inset 8px 8px 16px #E6CBCB, inset -8px -8px 16px rgba(255, 241, 241, 0.6);
  }
  button {
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 8px 8px 16px #E5CBCB, -8px -8px 16px rgba(255, 241, 241, 0.6);
  }
  button:active {
    box-shadow: inset 8px 8px 16px #E6CBCB, inset -8px -8px 16px rgba(255, 241, 241, 0.6);

  }
  .softInput {
    box-shadow: none;
  }
</style>
