<template>
  <a class="trash" href="#" v-on:click.stop="$emit('remove')">
    <font-awesome-icon :icon="['fa', 'trash']"/>
  </a>
</template>

<script>
export default {
  name: "TrashComponent"
}
</script>

<style scoped>
.trash:hover {
  color: tomato;
}
</style>