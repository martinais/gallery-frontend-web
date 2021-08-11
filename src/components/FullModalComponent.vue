<template>
  <Modal>
    <div id="modal-content">
      <font-awesome-icon class="modal-cancel" v-on:click="$emit('close')"
                         :icon="['fa', 'times']"/>
      <slot></slot>
    </div>
  </Modal>
</template>

<script>
import Modal from "./ModalComponent";

export default {
  name: "FullModalComponent",
  components: {Modal}
}
</script>

<style scoped>
#modal-content {
  position: relative;
  margin: 5% auto;
  padding: 10px;
  animation-name: animatetop;
  animation-duration: 0.4s;

  border-radius: 20px;
  border: 1px solid #888;
  background-color: #f6f6f6;
  width: 50%;
}

.modal-cancel {
  border: none;
  color: grey;
  float: right;
}

.modal-cancel:hover {
  color: red;
  cursor: pointer;
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0
  }
  to {
    top: 0;
    opacity: 1
  }
}
</style>