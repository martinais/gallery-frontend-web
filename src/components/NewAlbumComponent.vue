<template>
  <form v-on:submit.prevent="createAlbum">
    <h2>Create a new album</h2>
    <input id="name-input" v-model="albumName" placeholder="Name" type="text"/>
    <div id="button-wrapper">
      <input type="submit" value="Add Pics"/>
    </div>
  </form>
</template>

<script>
import {http} from '../helpers/http.js'

export default {
  name: 'NewAlbumComponent',
  data() {
    return {
      albumName: '',
    }
  },
  methods: {
    createAlbum() {
      http('POST', '/albums', {'name': this.albumName}).then(r => {
        if (r.status === 201) r.json().then(album => this.$emit('created', album));
        // TODO : handler error
        this.albumName = '';
      });
    },
  }
}
</script>

<style scoped>
h2 {
  font-weight: lighter;
}

input {
  width: 98%;
  font-size: 1rem;
  padding: 10px;
  border: none;
  border-radius: 10px;
  margin: 10px 0;
  background-color: #d8dbe3;
  cursor: pointer;
}

#name-input {
  height: 30px;
  outline: none;
}

#name-input:hover {
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #898989;
}

#name-input:focus {
  border-radius: 10px 10px 0 0;
  border-bottom: 2px solid #343434;
}

#button-wrapper {
  width: 100%;
  text-align: right;
}

#button-wrapper input {
  width: 200px;
}

#button-wrapper input:hover {
  background-color: #949494;
  color: white;
}

#image-icon {
  font-size: 5rem;
  margin-left: 10px;
}
</style>
