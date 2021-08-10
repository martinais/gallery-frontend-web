<template>
  <div style="position: relative">
    <TrashComponent class="trash" @remove="removePic"/>
    <img v-if="content" v-bind:src="content" :style="{height:(height-30)+'px'}"/>
    <p v-else>incomming ...</p>
  </div>
</template>

<script>
import {http, httpBuildPic} from '../helpers/http.js'
import TrashComponent from "./TrashComponent";

export default {
  name: 'Picture',
  components: {TrashComponent},
  props: {hash: String, album: String, height: Number},
  data() {
    return {content: undefined}
  },
  mounted() {
    httpBuildPic(this.hash, result => this.content = result)
  },
  methods: {
    removePic() {
      http('PATCH', '/albums/' + this.album + '/pics', {'-': [this.hash]})
          .then(() => this.$emit('update')).then(this.$emit('close'))
    },
  }
}
</script>

<style scoped>
.trash {
  position: absolute;
  font-size: 2rem;
  right: 30px;
  top: 30px;
  color: white;
}

img {
  margin: 15px;
}
</style>
