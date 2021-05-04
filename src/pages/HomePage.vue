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
          <font-awesome-icon id="modal-cancel" 
            :icon="['fa', 'times']"
             v-on:click="albumCreation = false" />
          <form id="album-create-form" v-on:submit.prevent="createAlbum">
            <h1>Create a new album</h1>
            <input v-model="albumName" placeholder="Name" type="text"/>
            <button type="submit">
              <font-awesome-icon :icon="['fa', 'check']" />
            </button>
          </form>
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
    triggerCreation() {
      console.log(this.albumCreation);
      this.albumCreation = true;
      console.log(this.albumCreation);
    },
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
    padding: 1em;
    animation-name: animatetop;
    animation-duration: 0.4s;
  }
  #modal-cancel {
    border: none;
    color: grey;
    float: right;
  }
  #modal-cancel:hover {
    color: black;
    cursor: pointer;
  }
  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
</style>
