<template>
  <div id="modal">
    <div id="modal-content">
      <font-awesome-icon id="modal-cancel" 
        :icon="['fa', 'times']" v-on:click="$emit('close')" />
      <!--<font-awesome-icon id="modal-right" class="angle"
        :icon="['fa', 'angle-right']" v-on:click="$emit('close')" />
      <font-awesome-icon id="modal-left" class="angle"
      :icon="['fa', 'angle-left']" v-on:click="$emit('close')" />-->
      <slot></slot>
 </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
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
    margin: 5% auto;
    padding: 1em;
    animation-name: animatetop;
    animation-duration: 0.4s;
  }
  #modal-cancel {
    position: fixed;
    top: 30px;
    right: 40px;
    border: none;
    color: white;
    font-size: 3rem;
  }
  #modal-cancel:hover {
    color: red;
    cursor: pointer;
  }
  .angle {
    position: fixed;
    top: 50%;
    border: none;
    color: white;
    font-size: 3rem;
  }
  .angle:hover {
    top: 49%;
    font-size: 4rem;
    cursor: pointer;
  }
  #modal-right { right: 40px; }
  #modal-left { left: 40px; }
  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
</style>
