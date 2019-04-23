<template>
<div class="info-group">
  <!-- slot for the label which will title the info group -->
  <span class="info-group__label" v-if="hasLabel">
    <slot name="label" />
  </span>

  <!-- slot for the content that will go inside of the message group under the label-->
  <div class="info-group__content">
    <slot name="content" />
  </div>
</div>
</template>

<script>
export default {
  name: 'info-group',
  computed: {
    hasLabel() {
      // returns true if label is being used (i.e. slot is filled)
      return this.$slots.hasOwnProperty("label")
    }
  }
}
</script>

<style lang="scss" scoped>
.info-group {
    width: 100%;
    text-align: center;
    padding-bottom: 2rem;
    margin: 1rem;
    &:not(:last-of-type) {
        border-bottom: 1px dashed $colorDarkBlue;
    }

    &__label {
        display: inline-block;
        font-size: 1.6rem;
        margin-bottom: 0.75rem;
        color: $colorDarkBlue;
    }

    p {
        text-align: left;
    }

    p:not(:first-of-type) {
        margin-top: 1rem;
    }
}
</style>
