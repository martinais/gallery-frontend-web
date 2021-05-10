<template>
  <div class="grid">
    <Header />
    <div id="content">
      <button id="import-btn" v-on:click="displayImport = true">
        +
      </button>
      <Picture :album="slug" :hash="hash" @update="updatePics"
               v-bind:key="hash" v-for="hash in pics"/>
      <Modal v-if="displayImport" @close="displayImport = false">
        <form v-on:submit.prevent="importPic">
          <!--<input @change="updateFiles" type="file" multiple />-->
          <input id="input-upload" type="file"
                 @change="selectPic"/>
          <input type="submit"/>
        </form>
      </Modal>
    </div>
  </div>
</template>

<script>
import Header from '../components/HeaderComponent.vue';
import Modal from '../components/ModalComponent.vue';
import Picture from '../components/PictureComponent.vue';

export default {
  name: 'Gallery',
  components: { Header, Modal, Picture },
  data() {
    return {
      slug: undefined,
      displayImport: false,
      picFile: undefined,
      pics: []
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
    selectPic() {
      this.picFile = event.target.files[0]
    },
    updatePics() {
      fetch(process.env.VUE_APP_BACKEND_URL + '/albums/' + this.slug + '/pics', {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + this.user.token}
      }).then(response => response.json()).then(data => this.pics = data.pics)
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
            fetch(process.env.VUE_APP_BACKEND_URL + '/albums/' + this.slug + '/pics', {
              method: 'PATCH',
              headers: {
                'Authorization': 'Bearer ' + this.user.token,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({'+': [hash]})
            }).then(() => { this.displayImport = false; this.updatePics() })
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
  #import-btn {
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    border-width: 0;
    background-color: #FCE0E0;
    cursor: pointer;
    /* replace with a font-awesome logo ? */
    font-size: 3em;
    font-weight: bolder;
    color: white;
  }
  #content {
    overflow: auto;
    white-space: nowrap;
  }
</style>
