<!-- Logo created with CSS -->
<template>
<div class="logo">
  <div class="logo__cell logo__cell--orange">M</div>
  <div class="logo__cell">ㄟ</div>
  <div class="logo__cell logo__cell--orange">R</div>
  <div class="logo__cell">ㄡ</div>
</div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
.logo {
    height: 100%;
    width: 100%;

    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    border: 2px solid $colorDarkBlue;
    border-right-color: $colorOrange;
    border-radius: 5px;
    padding: 2px;
    overflow: hidden;

    &__cell {
        // makes the text vertically centered
        // 4px is reference to the 2 * 2px border
        font-size: 3vh;
        line-height: calc(4vh - 4px);
        height: calc(4vh - 4px);
        width: calc(4vh - 4px);
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: $colorDarkBlue;

        &--orange {
            color: $colorOrange;
        }
    }
}
</style>
