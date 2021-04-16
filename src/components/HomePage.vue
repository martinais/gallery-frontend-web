<template>
  <div class="grid">
    <Header step="homepage" />
    <div class="content">
      bonjour {{ user.name }}
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
  .content { grid-area: content; }
</style>
