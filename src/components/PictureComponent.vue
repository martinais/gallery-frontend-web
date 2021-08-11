<template>
  <img v-if="content" v-bind:src="content" :style="{height:(height-30)+'px'}"/>
  <p v-else>incomming ...</p>
</template>

<script>
import {httpBuildPic} from '../helpers/http.js'

export default {
  name: 'Picture',
  props: {hash: String, height: Number},
  data() {
    return {content: undefined}
  },
  mounted() {
    httpBuildPic(this.hash, result => this.content = result)
  },
}
</script>

<style scoped>
img {
  margin: 15px;
}
</style>
