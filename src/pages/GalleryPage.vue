<template>
  <div class="grid">
    <Header />
    <h1>Gallery for {{ slug }}</h1>
      <!--
      <font-awesome-icon id="import-logo" :icon="['fa', 'plus']"/>
      -->
    <button id="import-btn" v-on:click="displayImport = true">
      +
    </button>
    <div v-bind:key="hash" v-for="(data, hash) in pics">
      <img width="300" v-bind:src="pics[hash]"/>
      <a href="#" v-on:click="removePic(pic)">delete</a>
    </div>
    <Modal v-if="displayImport" @close="displayImport = false">
      <form v-on:submit.prevent="importPic">
        <!--<input @change="updateFiles" type="file" multiple />-->
        <input id="input-upload" type="file"
               @change="selectPic"/>
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
      pics: {},
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
      })
        .then(response => response.json()).then(
          data => data.pics.map(hash => this.pics[hash] = 'default')
        )
        .then(() => {
          for (const key in this.pics) {
            fetch(process.env.VUE_APP_BACKEND_URL + '/pic/' + key, {
              method: 'GET',
              headers: {'Authorization': 'Bearer ' + this.user.token}
            })
              .then(data => {
                data.blob().then(blob => {
                  const reader = new FileReader();
                  reader.onload = () => this.pics[key] = reader.result
                  reader.readAsDataURL(blob)
                  console.log(this.pics[key])
                })
              })
          }
        })
    },
    removePic(hash) {
      fetch(process.env.VUE_APP_BACKEND_URL + '/albums/' + this.slug + '/pics', {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'-': [hash]})
      }).then(() => { this.updatePics() })
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
  /* 
  #import-logo {
    position: absolute;
    bottom: 50px;
    right: 50px;
    font-size: 2em;
    cursor: pointer;
    color: white;
  }
  */
</style>
