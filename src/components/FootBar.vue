<template>
<div class="foot-bar">
  <span class="foot-bar__text">Made by <span class="foot-bar__name">@daddehs1</span></span>
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
    top: #{$headerHeight + $mainHeight};
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

    &__name {
        color: $colorOrange;
    }
}
</style>
