<template>
  <div>
    <div v-if="album">
      <div class="album-tile">
        <div class="album-tile-top"></div>
        <div class="album-tile-bottom">
          <div class="album-tile-infos">
            <div class="album-tile-title">{{ album.name }}</div>
            <br>
            <div class="album-tile-count">XXX Photos</div>
          </div>
          <a class="album-tile-delete" href="#"
             v-on:click="$emit('remove', index)">delete</a>
        </div>
      </div>
    </div>
    <div v-else v-on:click="$emit('create')"
         class="album-tile album-tile-create">
      <p class="create-logo">+</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumTile',
  props: {
    album: Object,
    index: Number
  },
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
  .create-logo {
    font-size: 3em;
    margin-top: 0.8em;
  }
</style>
