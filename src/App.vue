<template>
<div id="app" :class="classObject">
  <!-- <ios-safari-wrapper> -->
  <layout/>
  <!-- </ios-safari-wrapper> -->
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import Layout from '@/components/Layout.vue'
import IosSafariWrapper from '@/components/IosSafariWrapper.vue'

export default {
  components: {
    Layout,
    IosSafariWrapper
  },
  computed: {
    ...mapGetters(['messageBoxOpen']),
    classObject() {
      var classObject = {
        'u-message-box-lock': this.messageBoxOpen,
      }
      classObject['mq-' + this.$mq] = true;
      return classObject;
    }
  }
}
</script>

<style lang="scss">
@import "./sass/global.scss";
</style>

<style lang="scss" scoped>
#app {
    height: 100%;
    width: 100%;

    &.u-message-box-lock {
        overflow: hidden !important;
    }
}
</style>
