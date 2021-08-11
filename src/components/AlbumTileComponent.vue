<template>
  <div>
    <div v-if="album">
      <div class="album-tile">
        <div class="album-tile-top" :style="{ backgroundImage: preview }">
          <TrashComponent class="album-tile-delete" @remove="$emit('remove', index)"/>
        </div>
        <div class="album-tile-bottom">
          <div class="album-tile-infos">
            <a class="album-tile-title">{{ album.name }}</a><br>
            <div class="album-tile-count">{{ album.count }} photos</div>
          </div>
        </div>
      </div>
    </div>
    <a v-else v-on:click="$emit('create')"
       class="album-tile album-tile-create">
      <p class="create-logo">+</p>
      <p class="create-label">Create New Album</p>
    </a>
  </div>
</template>

<script>
import {httpBuildPic} from '../helpers/http.js'
import TrashComponent from "./TrashComponent";

export default {
  name: 'AlbumTile',
  components: {TrashComponent},
  props: {album: Object, index: Number},
  data() {
    return {preview: "url('/album-default.jpg')"}
  },
  mounted() {
    if (this.album && this.album.preview)
      httpBuildPic(this.album.preview, r => this.preview = 'url(' + r + ')')
  }
}
</script>

<style scoped>
.album-tile {
  display: inline;
  margin: 20px;
  border-radius: 20px;
  float: left;
  width: 300px;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
}

.album-tile:hover {
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.25);
}

.album-tile-top {
  position: relative;
  height: 60%;
  background-size: cover;
}

.album-tile-delete {
  float: right;
  color: #f6f6f6;
  margin: 15px;
}

.album-tile-bottom {
  position: relative;
  height: 40%;
  padding: 15px;
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
  color: #0000008f;
  font-size: 0.8em;
}

.album-tile-create {
  border: solid;
  border-width: 3px;
  position: relative;
}

.create-logo {
  font-size: 9em;
  font-family: monospace;
  margin-top: 5%;
}

.create-label {
  font-weight: lighter;
  font-size: 15pt;
  position: absolute;
  bottom: 0;
  margin-bottom: 15px;
  width: 100%;
}
</style>
