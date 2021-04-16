<template>
  <div class="home">
    <Header/>
    username: {{ user.name }}
    token: {{ user.token }}
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    user: Object,
  },
  data() {
    return { }
  },
  methods: { }
}
</script>

<style scoped>

</style>
