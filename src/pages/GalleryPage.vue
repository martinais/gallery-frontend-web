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
        <form v-on:submit.prevent="importPic">
          <!--<input @change="updateFiles" type="file" multiple />-->
          <input id="input-upload" type="file" @change="selectPic"/>
          <input type="submit"/>
        </form>
      </Modal>
    </div>
  </div>
</template>

<script>
import { http } from '../helpers/http.js'
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
    selectPic() {
      this.picFile = event.target.files[0]
    },
    updatePics() {
      const x = (m,n) => m.filter((_,i) => i%3 == n)
      http('GET', '/albums/' + this.slug + '/pics').then(r => r.json())
        .then(d => this.pics = [x(d.pics, 0), x(d.pics, 1), x(d.pics, 2)])
    },
    importPic() {
      this.picFile.arrayBuffer()
        .then(buffer => window.crypto.subtle.digest('SHA-1', buffer))
        .then(hashBuffer => {
          const hashArray =  Array.from(new Uint8Array(hashBuffer));
          const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          const fd = new FormData();
          fd.append('file', this.picFile);
          const user = JSON.parse(localStorage.getItem('user'));
          fetch(process.env.VUE_APP_BACKEND_URL + '/pic/' + hash, {
            method: 'PUT',
            headers: {'Authorization': 'Bearer ' + user.token},
            body: fd
          }).then(response => {
            if (response.status != 204) return
            http('PATCH', '/albums/'+this.slug+'/pics', {'+':[hash]}).then(()=>{
              this.displayImport = false
              this.updatePics()
            })
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
