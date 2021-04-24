<template>
  <div class="grid">
    <Header :user="user" step="homepage" />
    <div class="content">
      <p>Hi There...</p>
      <br>
      <p>The Martinade's Pic V 0.0.1 Is Out.</p>
      <p>You've made it to your home page.</p>
      <p>Congratulations</p>
      <br>
      <p>We're Busy working on your V 0.0.2 version of the site. Comming next are:</p>
      <ul>
        <li>The possibility to create albums.</li>
        <li>The possibility to add your best pictures.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from './HeaderComponent.vue'

export default {
  name: 'HomePage',
  components: { Header },
  props: {
    user: Object
  }
}
</script>

<style scoped>
  .grid {
    background-color: white;
    background-size: cover;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-areas:
      'header'
      'content'
  }
  .header { grid-area: header; }
  .content {
    grid-area: content;
    text-align: left;
    margin: 0 auto;
    font-size: 1.5em;
  }
</style>
