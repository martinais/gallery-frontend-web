<template>
  <div class="grid">
    <Header />
    <div id="content" ref="content" @wheel="handleScroll">
      <button id="import-btn" v-on:click="displayImport = true">
        +
      </button>
      <div v-for="j in [0,1,2]" v-bind:key="j" class="gallery-row">
        <Picture :height="rowHeight" :album="slug" :hash="hash"
           @update="updatePics" v-bind:key="hash"
           v-for="hash in pics[j]"/>
      </div>
      <Modal v-if="displayImport" @close="displayImport = false">
        <form v-on:submit.prevent="uploadPics">
          <input @change="selectPics" type="file" multiple />
          <input type="submit"/>
        </form>
      </Modal>
    </div>
  </div>
</template>

<script>
import { http, httpUpload } from '../helpers/http.js'
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
      //picFile: undefined,
      uploadQueue: [],
      uploadProgress: [],
      pics: [],
      rowHeight: 100,
    }
  },
  mounted() {
    const params = new URLSearchParams(location.search);
    this.slug = params.get('slug')
    if (!this.slug) document.location = '/'
    this.updatePics()
    this.extractRowHeight()
    window.addEventListener('resize', this.extractRowHeight)
  },
  unmounted() {
    window.removeEventListener('resize', this.extractRowHeight)
  },
  methods: {
    handleScroll(event) {
      this.$refs.content.scrollBy(event.deltaY,0)
    },
    extractRowHeight() {
      this.rowHeight = this.$refs.content.clientHeight / 3
    },
    selectPics() {
      this.uploadQueue = event.target.files
    },
    updatePics() {
      const x = (m,n) => m.filter((_,i) => i%3 == n)
      http('GET', '/albums/' + this.slug + '/pics').then(r => r.json())
        .then(d => this.pics = [x(d.pics, 0), x(d.pics, 1), x(d.pics, 2)])
    },
    uploadPics() {
      for (let i = 0; i < this.uploadQueue.length; i++) {
        httpUpload(this.uploadQueue[i]).then(hash => this.progress(hash))
      }
    },
    progress(hash) {
      // TODO : update progress bar
      this.uploadProgress.push(hash)
      if (this.uploadProgress.length == this.uploadQueue.length)
        this.updateAlbum()
    },
    updateAlbum() {
      const data = { '+': this.uploadProgress }
      http('PATCH', '/albums/'+this.slug+'/pics', data).then(()=>{
        this.displayImport = false
        this.updatePics()
      })
    },
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
    grid-template-rows: 10% 90%;
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
  #content { overflow: auto; white-space: nowrap; }
  .gallery-row { font-size: 0; text-align: left; }
</style>
