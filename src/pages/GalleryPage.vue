<template>
  <div class="grid">
    <Header />
    <h1>Gallery for {{ slug }}</h1>
    <button v-on:click="displayImport = true">Importer une photo</button>
    <Modal v-if="displayImport" @close="displayImport = false">
      <form>
        <input type="file"/>
        <input type="submit"/>
      </form>
    </Modal>
  </div>
</template>

<script>
import Header from '../components/HeaderComponent.vue';
import Modal from '../components/ModalComponent.vue';

export default {
  name: 'Gallery',
  components: { Header, Modal },
  data() {
    return {
      slug: '',
      displayImport: false,
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
