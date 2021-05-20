<template>
  <div class="grid">
    <Header step='login' />
    <div id="welcome">
      <div>Welcome to</div><br><div>Martine's Pic</div>
    </div>
    <LogForm @authenticated="connect"/>
  </div>
</template>

<script>
import Header from '../components/HeaderComponent.vue'
import LogForm from '../components/LogFormComponent.vue'

export default {
  name: 'LoginPage',
  components: {
    Header,
    LogForm,
  },
  mounted() { this.connect() },
  methods: {
    connect() {
      if (localStorage.getItem('user')) document.location = '/home';
    }
  }
}
</script>

<style scoped>
  .grid {
    font-family: sans-serif;
    text-align: center;
    background-color: white;
    background-image: url('/home-pic-shrinked.png');
    background-size: cover;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-auto-rows: min-content;
    grid-template-rows: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
    grid-template-columns: 20% 20% 10% 10% 10% 10% 10% 10%;
  }
  #header {
    grid-column-start: 1;
    grid-column-end: -1;
  }
  #welcome {
    grid-row-start: 2;
    grid-column-end: span 3;
    text-align: left;
    font-size: 5em;
    font-family: serif;
    margin-top: 0.4em;
    margin-left: 1em;
  }
  #welcome > div {
    margin: 0;
    display: inline;
  }
  #logform {
    grid-column-start: 4;
    grid-column-end: span 4;
    grid-row-start: 5;
  }
</style>
