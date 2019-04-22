<template>
<div id="app">
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
  }
}
</script>

<style lang="scss">
@import "./sass/global.scss";
</style>

<style lang="scss" scoped>
#app {
    height: 100vh;
    width: 100vw;
    // &.u-message-box-lock {
    //     overflow: hidden !important;
    // }
}
</style>
