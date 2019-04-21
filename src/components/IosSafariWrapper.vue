<template>
<div class="ios-safari-wrapper" :style="styleObject">
  <div class="ios-safari-wrapper__content">
    <slot></slot>
  </div>
  <div class="ios-safari-wrapper__buffer">
  </div>
</div>
</template>

<script>
export default {
  name: "ios-safari-wrapper",
  data() {
    return {
      isMounted: false
    }
  },
  mounted() {
    this.isMounted = true;
  },
  computed: {
    styleObject() {
      return {
        height: this.$innerHeight()
      }
    }
  }
}
</script>

<style lang="scss">
.ios-safari-wrapper {
    //position: fixed;
    height: 100%;
    width: 100%;
}
</style>
