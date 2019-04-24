<template>
<div class="switch" :class="classObject">
  <!-- dummy checkbox that is used to toggle switch on/off -->
  <input :checked="inputVal" :name="this.name" :id="this.name + '-target'" class="switch__dummy" type="checkbox" />
  <!-- label for off state -->
  <label class="switch__label switch__label--left">
    <slot name="label-left"></slot>
  </label>
  <label :for="this.name + '-target'" class="switch__checkbox"></label>
  <!-- // label for on state -->
  <label class="switch__label switch__label--right">
    <slot name="label-right"></slot>
  </label>
</div>
</template>

<script>
export default {
  name: 'switch-box',
  props: {
    name: String,
    double: Boolean,
    value: Boolean
  },
  computed: {
    inputVal() {
      return this.value;
    },
    // helper to bind class to component root
    classObject() {
      return {
        // modifier class to signify switch has two active values
        //   (as opposed to "on" and "off")
        // keeps switch from graying out in the "off" state
        "switch--double": this.double
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
    $this: &;

    display: flex;

    &__dummy {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
    }

    &__checkbox {
        cursor: pointer;
        user-select: none;
        width: 5rem;
        height: 2.2rem;
        border: 2px solid $colorGrey;
        border-radius: 1rem;
        display: inline-block;
        position: relative;

        &:after {
            content: "";
            width: 1.4rem;
            height: 1.4rem;
            margin: 0 0.2rem;
            border-radius: 1rem;
            position: absolute;
            top: calc(50% - .7rem);
            left: 0;
            background-color: $colorGrey;
            transition: 0.1s all;
        }
    }

    &__label {
        display: inline-block;
        // allows centering to be based on switch itself
        width: calc(50% - 3.5rem);
        font-weight: 300;
        letter-spacing: 1px;
        transition: color 0.1s;

        &--left {
            color: $colorOrange;
            text-align: right;
            margin-right: 1rem;
        }
        &--right {
            color: $colorBlack;
            text-align: left;
            margin-left: 1rem;
        }
    }

    &__dummy:checked {
        & ~ #{$this} {
            &__checkbox {
                border-color: $colorDarkBlue;

                &:after {
                    background-color: $colorOrange;
                    margin-left: 3rem;
                }
            }

            &__label {
                &--left {
                    color: $colorBlack;

                }
                &--right {
                    color: $colorOrange;
                }
            }
        }
    }

    &--double {
        #{$this} {
            &__checkbox {
                border: 2px solid $colorDarkBlue;
                &:after {
                    background-color: $colorOrange;
                }
            }
        }
    }
}
</style>
