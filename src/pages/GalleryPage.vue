<template>
  <div class="grid">
    <Header />
      <h1>Gallery for {{ slug }}</h1>
  </div>
</template>

<script>
import Header from '../components/HeaderComponent.vue';

export default {
  name: 'Gallery',
  components: { Header },
  data() {
    return {
      slug: ''
    }
  },
  mounted() {
    const params = new URLSearchParams(location.search);
    this.slug = params.get('slug')
    if (!this.slug) document.location = '/'
  }
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
    grid-auto-rows: min-content;
    grid-template-areas:
      'header'
      'content'
  }
</style>
