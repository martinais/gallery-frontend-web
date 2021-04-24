<template>
  <div class="header">
    <span class="logo">M.</span>
    <div v-if="user" class="message">Welcome {{ user.name.toUpperCase() }}</div>
    <div class="buttons">
      <div v-if="step === 'login' || step === 'signin'">
        <button class="signinbtn" :class="{ selected: (step === 'signin') }">
          Sign In
        </button>
        <button :class="{ selected: (step === 'login') }">
          Log In
        </button>
      </div>
      <div v-else>
        <button v-on:click="disconnect" class="disconnectbtn">Disconnect</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    step: String,
    user: Object
  },
  data() {
    return {
    }
  },
  methods: {
    disconnect() {
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
    font-size: 4em;
    margin: 0.2em;
    grid-area: logo;
  }
  .message {
    font-size: 2em;
    margin: 1em auto;
    grid-area: message;
  }
  .buttons {
    grid-area: buttons;
  }
  button {
    float: right;
    font-family: serif;
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
