<template>
  <img v-if="content" v-bind:src="content" :style="{height:(height-30)+'px'}"/>
  <p v-else>incomming ...</p>
  <a hidden href="#" v-on:click="removePic">delete</a>
</template>

<script>
import { http } from '../helpers/http.js'

export default {
  name: 'Picture',
  props: { hash: String, album: String, height: Number },
  data() { return { content: undefined } },
  mounted() {
    http('GET', '/pic/' + this.hash).then(data => data.blob().then(blob => {
      const reader = new FileReader();
      reader.onload = () => this.content = reader.result
      reader.readAsDataURL(blob)
    }))
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
</style>
