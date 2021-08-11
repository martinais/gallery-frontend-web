<template>
  <div v-on:click.stop="$emit('remove')">
    <font-awesome-icon :icon="['fa', 'trash']" class="style"/>
  </div>
</template>

<script>
export default {
  name: "TrashComponent"
}
</script>

<style scoped>
.style {
  cursor: pointer;
}

.style:hover {
  color: tomato;
}
</style>