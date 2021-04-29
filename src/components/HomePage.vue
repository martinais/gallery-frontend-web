<template>
  <div class="grid">
    <Header :user="user" step="homepage" />
    <div class="content">
      <AlbumTile v-for="(album, index) in albums" v-bind:key="album.slug"
                 :album="album" :index="index" @remove="removeAlbum" />
      <AlbumTile @create="triggerCreation"/>
      <div class="modal" v-if="albumCreation">
        <div class="modal-content">
          <form id="album-create-form" v-on:submit="createAlbum">
            <h1>Create Album</h1>
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
import Header from './HeaderComponent.vue';
import AlbumTile from './AlbumTileComponent.vue';

export default {
  name: 'HomePage',
  components: { Header, AlbumTile },
  props: {
    user: Object
  },
  data() {
    return {
      albumCreation: false,
      albumName: '',
      albums: []
    }
  },
  mounted() {
    fetch(process.env.VUE_APP_BACKEND_URL + '/albums', {
      headers: {'Authorization': 'Bearer ' + this.user.token},
    }).then(response => {
      if (response.status == 200)
        response.json().then(albums => this.albums = albums);
    });
  },
  methods: {
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
    background-color: white;
    background-size: cover;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-areas:
      'header'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
      'content'
  }
  .header { grid-area: header; }
  .content {
    grid-area: content;
    font-size: 1.5em;
    overflow-y: scroll;
  }
  .modal {
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: 5% auto;
    padding: 2em;
    border: 1px solid #888;
    width: 60%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    animation-name: animatetop;
    animation-duration: 0.4s;
  }
  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
</style>
