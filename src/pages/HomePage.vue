<template>
  <div class="grid">
    <Header :user="user" step="homepage" />
    <div class="content" v-on:click="closeModal">
      <AlbumTile v-for="(album, index) in albums"
                 v-bind:key="album.slug"
                 v-on:click="navigateAlbum(album.slug)"
                 :album="album" :index="index" @remove="removeAlbum" />
      <AlbumTile @create="albumCreation = true"/>
      <Modal v-if="albumCreation" @close="albumCreation = false">
        <form id="album-create-form" v-on:submit.prevent="createAlbum">
          <h1>Create a new album</h1>
          <input v-model="albumName" placeholder="Name" type="text"/>
          <button type="submit">
            <font-awesome-icon :icon="['fa', 'check']" />
          </button>
        </form>
      </Modal>
    </div>
  </div>
</template>

<script>
import Header from '../components/HeaderComponent.vue';
import AlbumTile from '../components/AlbumTileComponent.vue';
import Modal from '../components/ModalComponent.vue';

export default {
  name: 'HomePage',
  components: { Header, AlbumTile, Modal },
  data() {
    return {
      albumCreation: false,
      albumName: '',
      albums: [],
      user: {},
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    fetch(process.env.VUE_APP_BACKEND_URL + '/albums', {
      headers: {'Authorization': 'Bearer ' + this.user.token},
    }).then(response => {
      if (response.status == 200)
        response.json().then(albums => this.albums = albums);
    });
  },
  methods: {
    navigateAlbum: (slug) => document.location = '/album?slug=' + slug,
    createAlbum() {
      fetch(process.env.VUE_APP_BACKEND_URL + '/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.user.token
        },
        body: JSON.stringify({'name':this.albumName})
      }).then(response => {
        if (response.status == 201)
          response.json().then(album => this.albums.push(album));
        this.albumCreation = false;
      });
    },
    removeAlbum(index) {
      let album = this.albums[index];
      fetch(process.env.VUE_APP_BACKEND_URL + '/albums/' + album.slug, {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + this.user.token},
      }).then(response => {
        if (response.status == 204) this.albums.splice(index, 1);
      });
    }
  },
}
</script>

<style scoped>
  input {
    outline: none;
    width: 80%;
    padding: 15px;
    border: none;
    border-bottom: solid;
    border-radius: 10px 0 0 0;
    border-color: grey;
    border-width: 5px;
    background-color: lightgrey;
  }
  input:focus {
    border-color: black;
  }
  form > button {
    outline: none;
    padding: 15px;
    border: none;
    border-bottom: solid;
    border-radius: 0 10px 0 0;
    border-color: grey;
    border-width: 5px;
    background-color: lightgrey;
    color: grey;
  }
  form > button:hover {
    cursor: pointer;
    color: green;
  }
  form > button:focus {
    border-color: black;
  }
  form {
    margin: 1em;
  }
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
  .header { grid-area: header; }
  .content {
    grid-area: content;
    grid-row-start: 2;
    grid-row-end: 10;
    font-size: 1.5em;
    overflow-y: scroll;
  }
</style>
