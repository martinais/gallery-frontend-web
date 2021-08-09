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
        <NewAlbumComponent @created="albumCreationHandler"/>
      </Modal>
    </div>
  </div>
</template>

<script>
import { http } from '../helpers/http.js'
import Header from '../components/HeaderComponent.vue';
import AlbumTile from '../components/AlbumTileComponent.vue';
import Modal from '../components/ModalComponent.vue';
import NewAlbumComponent from '../components/NewAlbumComponent.vue';

export default {
  name: 'HomePage',
  components: { Header, AlbumTile, Modal, NewAlbumComponent},
  data() {
    return {
      albumCreation: false,
      albums: [],
      user: {},
    }
  },
  mounted() {
    http('GET', '/albums').then(r => {
      if (r.status == 200) r.json().then(albums => this.albums = albums);
    });
  },
  methods: {
    navigateAlbum: (slug) => document.location = '/album?slug=' + slug,
    removeAlbum(index) {
      let album = this.albums[index];
      http('DELETE', '/albums/' + album.slug).then(response => {
        if (response.status == 204) this.albums.splice(index, 1);
      });
    },
    albumCreationHandler(album) {
      this.albums.push(album);
      this.albumCreation = false;
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
    cursor: pointer;
  }
  form > button:hover {
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
    grid-template-rows: 10% 90%;
  }
  .content {
    font-size: 1.5em;
    overflow-y: scroll;
  }
</style>
