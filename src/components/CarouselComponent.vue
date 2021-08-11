<template>
  <Modal>
    <!--<font-awesome-icon id="modal-right" class="angle"
      :icon="['fa', 'angle-right']" v-on:click="$emit('close')" />
      -->
    <div id="actionColumn">
      <CloseComponent class="action" @close="$emit('close')"/>
      <TrashComponent class="action" @remove="removePic"/>
    </div>
    <div id="picWrapper">
      <slot></slot>
    </div>
    <!--<font-awesome-icon id="modal-left" class="angle"
    :icon="['fa', 'angle-left']" v-on:click="$emit('close')" />-->
  </Modal>
</template>

<script>
import {http} from "../helpers/http";
import Modal from "./ModalComponent";
import TrashComponent from "./TrashComponent";
import CloseComponent from "./CloseComponent";

export default {
  name: 'Carousel',
  props: {album: String, hash: String},
  components: {CloseComponent, Modal, TrashComponent},
  methods: {
    removePic() {
      http('PATCH', '/albums/' + this.album + '/pics', {'-': [this.hash]})
          .then(() => this.$emit('update')).then(this.$emit('close'))
    },
  }
}
</script>

<style scoped>
#picWrapper {
  margin-top: 30px;

}

#actionColumn {
  position: fixed;
  right: 30px;
  z-index: 3;
}

.action {
  display: block;
  font-size: 2.5rem;
  color: white;
  margin: 30px 0;
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

#modal-right {
  right: 40px;
}

#modal-left {
  left: 40px;
}
</style>
