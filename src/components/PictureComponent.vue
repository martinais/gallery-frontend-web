<template>
  <div class="picture">
    <img v-if="content" v-bind:src="content" :style="{ height: height+'px' }"/>
    <p v-else>incomming ...</p>
    <a hidden href="#" v-on:click="removePic">delete</a>
  </div>
</template>

<script>
export default {
  name: 'Picture',
  props: { hash: String, album: String, height: Number },
  data() { return { content: undefined } },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    fetch(process.env.VUE_APP_BACKEND_URL + '/pic/' + this.hash, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + this.user.token}
    }).then(data => data.blob().then(blob => {
      const reader = new FileReader();
      reader.onload = () => this.content = reader.result
      reader.readAsDataURL(blob)
    }))
  },
  methods: {
    removePic() {
      fetch(process.env.VUE_APP_BACKEND_URL + '/albums/' + this.album + '/pics', {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'-': [this.hash]})
      }).then(() => this.$emit('update'))
    },
  }
}
</script>

<style scoped>
  .picture { display: inline; }
</style>
