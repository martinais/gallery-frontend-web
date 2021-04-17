<template>
  <div class="grid">
    <Header step="homepage" />
    <form v-on:submit="createAlbum">
      <h1>Create Album</h1>
      <input placeholder="Name" v-model="albumName" type="text"/>
      <button type="submit">Create</button>
    </form>
    <div>
      <h1>List Albums</h1>
      <ul>
        <li v-for="(album, index) in albums" v-bind:key="album.slug">
          {{ album.name }}
          <a v-on:click="removeAlbum(index)" href="#">delete</a>
        </li>
      </ul>
    </div>
    <div class="content">
      bonjour {{ user.name }}
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
  }
  .header { grid-area: header; }
  .content { grid-area: content; }
</style>
