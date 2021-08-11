<template>
  <div v-on:click="$emit('close')">
    <font-awesome-icon :icon="['fa', 'times']" class="style"/>
  </div>
</template>

<script>
export default {
  name: "CloseComponent"
}
</script>

<style scoped>
.style {
  cursor: pointer;
}

.style:hover {
  color: grey;
}
</style>