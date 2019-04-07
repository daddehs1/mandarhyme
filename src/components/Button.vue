<template>
<button type="submit" class="button">
  <span class="button__text">{{this.label}}</span>
</button>
</template>

<script>
export default {
  props: ["label"]
}
</script>

<style lang="scss" scoped>
.button {

    .mq-mobile & {
        width: 100%;
    }

    // undo default button
    border: 0;
    font: inherit;
    color: inherit;
    &:focus {
        outline: inherit;
    }

    cursor: pointer;
    width: 10rem;
    height: 4rem;
    background-color: $colorDarkOrange;

    // &:active {
    //     background-color: $colorOrange;
    // }

    &__text {
        user-select: none;
        color: white;
        font-size: 2rem;
        text-align: center;
        letter-spacing: 0.1rem;
        font-weight: 100;
    }
}
</style>
