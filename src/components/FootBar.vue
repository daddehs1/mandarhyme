<template>
<div class="foot-bar">
  <span class="foot-bar__text">Made by <span class="foot-bar__name"><a target="_blank" href="https://github.com/daddehs1">daddehs1</a></span></span>
</div>
</template>

<script>
export default {
  name: "foot-bar"
}
</script>

<style lang="scss">
.foot-bar {
    height: $footerHeight;
    width: 100%;
    //top: #{$headerHeight + $mainHeight};
    bottom: 0;
    padding-bottom: 2rem;

    position: fixed;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &__text {
        font-size: 1.2rem;
        color: $colorBlack;
    }

    &__name {}
}
</style>
