<template>
  <div class="grid">
    <Header :user="user" step="homepage" />
    <div class="content" v-on:click="closeModal">
      <AlbumTile v-for="(album, index) in albums"
                 v-bind:key="album.slug"
                 v-on:click="navigateAlbum(album.slug)"
                 :album="album" :index="index" @remove="removeAlbum" />
      <AlbumTile @create="triggerCreation"/>
      <div id="modal" v-if="albumCreation">
        <div id="modal-content">
          <form id="album-create-form" v-on:submit="createAlbum">
            <h1>Create a new album</h1>
            <input placeholder="Name" v-model="albumName" type="text"/>
            <button type="submit">Create</button>
          </form>
          <button v-on:click="albumCreation = false">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/HeaderComponent.vue';
import AlbumTile from '../components/AlbumTileComponent.vue';

export default {
  name: 'HomePage',
  components: { Header, AlbumTile },
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
    abolutePosition() {
//      let modal = document.getElementById('modal-content');
//      let top = 0, left = 0;
//      do {
//        top += element.offsetTop || 0;
//        left += element.offsetLeft || 0;
//        element = element.offsetParent;
//      } while(element);
//      return {
//        top: top,
//        left: left,
//      }
    },
    closeModal() {
    },
    triggerCreation() {
      console.log(this.albumCreation);
      this.albumCreation = true;
      console.log(this.albumCreation);
    },
    createAlbum(e) {
      e.preventDefault();
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
  #modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
  }
  #modal-content {
    position: relative;
    border-radius: 20px;
    border: 1px solid #888;
    background-color: #f6f6f6;
    width: 60%;
    margin: 5% auto;
    padding: 2em;
    animation-name: animatetop;
    animation-duration: 0.4s;
  }
  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
</style>
