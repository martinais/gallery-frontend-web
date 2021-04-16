<template>
  <div class="header">
    <span class="logo">M.</span>
    <div v-if="step === 'login' || step === 'signin'">
      <button :class="{ selected: (step === 'login') }">Sign In</button>
      <button :class="{ selected: (step === 'signin') }">Log In</button>
    </div>
    <div v-else>
      <button class="disconnectbtn">Disconnect</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    authenticated: Boolean,
  },
  data() {
    return {
      step: Step.LOGIN
    }
  },
  methods: {
  }
}

const Step = {
  LOGIN: 'login',
  SIGNIN: 'signin',
  HOMEPAGE: 'homepage',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    background-color: #FCE0E0;
    max-height: 6em;
  }
  .logo {
    float: left;
    font-size: 4em;
    margin: 0.2em 1em;
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
    font-family: Serif;
    box-shadow: inset 8px 8px 16px #E6CBCB, inset -8px -8px 16px rgba(255, 241, 241, 0.6);
  }
  .selected {
    box-shadow: 8px 8px 16px #E5CBCB, -8px -8px 16px rgba(255, 241, 241, 0.6);
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
