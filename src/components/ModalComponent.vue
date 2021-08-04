<template>
  <div id="modal">
    <div id="modal-content">
      <font-awesome-icon id="modal-cancel" :icon="['fa', 'times']"
        v-on:click="$emit('close')" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
}
</script>

<style scoped>
  #modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
  }
  #modal-content {
    position: relative;
    border-radius: 20px;
    border: 1px solid #888;
    background-color: #f6f6f6;
    width: 60%;
    margin: 5% auto;
    padding: 10px;
    animation-name: animatetop;
    animation-duration: 0.4s;
  }
  #modal-cancel {
    border: none;
    color: grey;
    float: right;
  }
  #modal-cancel:hover {
    color: black;
    cursor: pointer;
  }
  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
</style>
