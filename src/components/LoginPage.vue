<template>
  <div class="grid">
    <Header step='login' />
    <div class="welcome" id="welcome">
      <div>Welcome to</div><br><div>Martine's Pic</div>
    </div>
    <LogForm @authenticated="$emit('authenticated', $event)"/>
  </div>
</template>

<script>
import Header from './HeaderComponent.vue'
import LogForm from './LogFormComponent.vue'

export default {
  name: 'LoginPage',
  components: {
    Header,
    LogForm,
  },
}
</script>

<style scoped>
  .grid {
    background-color: white;
    background-image: url('/home-pic-shrinked.png');
    background-size: cover;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-areas:
      'header  header  header  header  header  header  header  header  header'
      'welcome welcome welcome .       .       .       .       .       .     '
      'welcome welcome welcome .       .       .       .       .       .     '
      'welcome welcome welcome .       logform logform logform logform .     '
      'welcome welcome welcome .       logform logform logform logform .     '
      '.       .       .       .       logform logform logform logform .     '
      '.       .       .       .       logform logform logform logform .     '
      '.       .       .       .       .       .       .       .       .     '
  }
  .header { grid-area: header; }
  .welcome { grid-area: welcome; font-family: serif; }
  .logform { grid-area: logform; }

  #welcome {
    text-align: left;
    font-size: 5em;
    margin-top: 0.4em;
    margin-left: 1em;
  }
  #welcome > div {
    margin: 0;
    display: inline;
  }
</style>
