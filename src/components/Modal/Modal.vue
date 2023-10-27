<template>
  <div v-if="show" class="modal z-[9999999999]">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
}
</style>