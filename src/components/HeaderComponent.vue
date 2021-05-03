<template>
  <div class="header">
    <span class="logo">M.</span>
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
  .header {
    background-color: #FCE0E0;
    max-height: 6em;
    display: grid;
    grid-template-areas:
      'logo . . message . . buttons';
  }
  .logo {
    font-family: Serif;
    font-size: 4em;
    margin: 0.2em;
    margin-bottom: 0;
    grid-area: logo;
  }
  .message {
    font-size: 2em;
    margin: 1em auto;
    grid-area: message;
    margin-bottom: 0;
  }
  .buttons {
    grid-area: buttons;
    margin-bottom: 0;
  }
  button {
    float: right;
    display: inline;
    border-style: hidden;
    border-radius: 4px;
    outline: none;
    margin: 1.5em 2em;
    width: 10em;
    height: 3em;
    background: #FCE0E0;
    cursor: pointer;
    font-size: 1em;
    box-shadow: 8px 8px 16px #E5CBCB, -8px -8px 16px rgba(255, 241, 241, 0.6);
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
