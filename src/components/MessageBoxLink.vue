<template>
<div @click="open" class="message-box-link">
  <slot></slot>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex';

export default {
  name: "message-box-link",
  props: ["mb-target"],
  methods: {
    ...mapActions(['registerMessageBox', 'deregisterMessageBox', 'openMessageBox']),
    open() {
      this.openMessageBox({
        target: this.mbTarget
      });
    }
  },
  created() {
    // register message box into store
    this.registerMessageBox({
      target: this.mbTarget
    });
  },
  beforeDestroy() {
    // deregister message box from store
    this.deregisterMessageBox({
      target: this.mbTarget
    });
  }
}
</script>

<style lang="scss">

</style>
