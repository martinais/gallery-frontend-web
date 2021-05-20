<template>
  <div class="header">
    <span class="logo"><a href="/">M.</a></span>
    <div v-if="user" class="message">Welcome {{ user.name.toUpperCase() }}</div>
    <div class="buttons">
      <button v-if="user" v-on:click="disconnect" class="disconnectbtn">
        Disconnect
      </button>
      <div v-else>
        <button class="signinbtn" :class="{ selected: (step === 'signin') }">
          Sign In
        </button>
        <button :class="{ selected: (step === 'login') }">
          Log In
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
  },
  data() {
    return {
      step: undefined,
      user: undefined
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },
  methods: {
    disconnect() {
      localStorage.removeItem('user');
      document.location = '/'
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: black;
  }
  button {
    float: right;
    display: inline;
    border-style: hidden;
    border-radius: 4px;
    outline: none;
    width: 10em;
    height: 3em;
    background: #FCE0E0;
    cursor: pointer;
    font-size: 1em;
    box-shadow: 8px 8px 16px #E5CBCB, -8px -8px 16px rgba(255, 241, 241, 0.6);
  }
  .header {
    background-color: #FCE0E0;
    display: grid;
    grid-template-areas:
      'logo . . message . . buttons';
  }
  .logo {
    grid-area: logo;
    font-family: Serif;
    font-size: 4em;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .message {
    grid-area: message;
    font-size: 2em;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .buttons {
    grid-area: buttons;
    margin: auto;
    display: flex;
    align-items: center;
  }
  .selected {
    box-shadow: inset 8px 8px 16px #E6CBCB, inset -8px -8px 16px rgba(255, 241, 241, 0.6);
  }
  .signinbtn {
    cursor: not-allowed;
  }
  .disconnectbtn {
    box-shadow: 8px 8px 16px #E5CBCB, -8px -8px 16px rgba(255, 241, 241, 0.6);
  }
  .disconnectbtn:active {
    box-shadow: inset 8px 8px 16px #E6CBCB, inset -8px -8px 16px rgba(255, 241, 241, 0.6);
  }
</style>
