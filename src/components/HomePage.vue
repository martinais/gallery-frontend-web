<template>
  <div class="grid">
    <Header :user="user" step="homepage" />
    <div class="content">
      <div class="album-tile"
           v-for="(album, index) in albums" v-bind:key="album.slug">
        <div class="album-tile-top"></div>
        <div class="album-tile-bottom">
          <div class="album-tile-infos">
            <div class="album-tile-title">{{ album.name }}</div>
            <br>
            <div class="album-tile-count">XXX Photos</div>
          </div>
          <a class="album-tile-delete"
             v-on:click="removeAlbum(index)" href="#">delete</a>
        </div>
      </div>
      <div class="album-tile album-tile-create">
        +
        <!-- TODO add an awesome logo -->
      </div>
      <form v-on:submit="createAlbum">
        <h1>Create Album</h1>
        <input placeholder="Name" v-model="albumName" type="text"/>
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from './HeaderComponent.vue'

export default {
  name: 'HomePage',
  components: { Header },
  props: {
    user: Object
  },
  data() {
    return {
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
  .album-tile {
    display: inline;
    margin: 1em;
    border-radius: 20px;
    float: left;
    width: 300px;
    height: 200px;
    overflow: hidden;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }
  .album-tile:hover {
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
  .album-tile-top {
    position: relative;
    height: 60%;
    background-image: url('/album-default.jpg');
    background-size: cover;
  }
  .album-tile-bottom {
    position: relative;
    height: 40%;
    padding: 0.2em;
    text-align: left;
  }
  .album-tile-infos {
    display: inline;
  }
  .album-tile-title {
    display: inline;
  }
  .album-tile-count {
    display: inline;
  }
  .album-tile-delete {
    float: right;
  }
  .album-tile-create {
    border: solid;
  }
</style>
