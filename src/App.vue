<template>
<div id="app">
  <layout/>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import Layout from '@/components/Layout.vue'

export default {
  components: {
    Layout
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
