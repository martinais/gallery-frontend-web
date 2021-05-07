<template>
  <div class="grid">
    <Header />
    <h1>Gallery for {{ slug }}</h1>
    <button v-on:click="displayImport = true">Importer une photo</button>
    <div v-bind:key="index" v-for="(pic, index) in pics">{{ pic }}</div>
    <Modal v-if="displayImport" @close="displayImport = false">
      <form v-on:submit.prevent="importPic">
        <!--<input @change="updateFiles" type="file" multiple />-->
        <input @change="updateFile" type="file"/>
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
      slug: undefined,
      displayImport: false,
      picFile: undefined,
      pics: [],
    }
  },
  mounted() {
    const params = new URLSearchParams(location.search);
    this.slug = params.get('slug')
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.slug) document.location = '/'
    this.updatePics()
  },
  methods: {
    updatePics() {
      fetch(process.env.VUE_APP_BACKEND_URL + '/albums/' + this.slug + '/pics', {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + this.user.token}
      }).then(response => response.json()).then(data => this.pics = data.pics)
    },
    updateFile(event) {
      this.picFile = event.target.files[0];
    },
    importPic() {
      this.picFile.arrayBuffer()
        .then(buffer => window.crypto.subtle.digest('SHA-1', buffer))
        .then(hashBuffer => {
          const hashArray =  Array.from(new Uint8Array(hashBuffer));
          const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          const fd = new FormData();
          fd.append('file', this.picFile);
          fetch(process.env.VUE_APP_BACKEND_URL + '/pic/' + hash, {
            method: 'PUT',
            headers: {'Authorization': 'Bearer ' + this.user.token},
            body: fd
          }).then(response => {
            if (response.status != 204) return
            this.updatePics()
            fetch(process.env.VUE_APP_BACKEND_URL + '/albums/' + this.slug + '/pics', {
              method: 'PUT',
              headers: {
                'Authorization': 'Bearer ' + this.user.token,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({pics: [hash]})
            }).then(this.displayImport = false)
          })
        });
    }
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
