<template>
  <div style="position: relative">
    <a id="trash" href="#" v-on:click.stop="removePic">
      <font-awesome-icon :icon="['fa', 'trash']" />
    </a>
    <img v-if="content" v-bind:src="content" :style="{height:(height-30)+'px'}"/>
    <p v-else>incomming ...</p>
  </div>
</template>

<script>
import { http, httpBuildPic } from '../helpers/http.js'

export default {
  name: 'Picture',
  props: { hash: String, album: String, height: Number },
  data() { return { content: undefined } },
  mounted() {
    httpBuildPic(this.hash, result => this.content = result)
  },
  methods: {
    removePic() {
      http('PATCH', '/albums/'+this.album+'/pics', {'-': [this.hash]})
        .then(() => this.$emit('update'))
    },
  }
}
</script>

<style scoped>
  img { margin: 15px; }
  #trash:hover { color: red }
  #trash {
    position: absolute;
    font-size: 2rem;
    right: 30px;
    top: 30px;
    color: white;
  }
</style>
