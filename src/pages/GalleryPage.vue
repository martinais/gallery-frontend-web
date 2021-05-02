<template>
  <div class="grid">
    <Header :user="user" />
    <h1>Gallery</h1>
  </div>
</template>

<script>
import Header from '../components/HeaderComponent.vue';

export default {
  name: 'Gallery',
  components: { Header },
  props: {
    user: Object,
    album: Object
  },
}
</script>

<style scoped>
  .grid {
    font-family: sans-serif;
    text-align: center;
    background-color: white;
    background-size: cover;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-areas:
      'header'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
  }
</style>
