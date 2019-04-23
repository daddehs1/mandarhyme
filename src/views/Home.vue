<template>
<div class="home">
  <div class="home__intro">
    <p>
      Enter a Chinese word or phrase below to find a list of rhyming words
    </p>
  </div>
  <form class="search-form" ref="search-form" @submit.prevent="handleSubmit">
    <div class="search-box">
      <Search ref="home-search" class="search-box__search" />
      <div class="search-box__options">
        <label class="search-box__label">Match Tones: </label>
        <switch-box :value="this.settings.defaultMatchTones" name="match-tones" />
        <help-tooltip mb-target="matchTonesHelp" class="search-box__tone-help" />
      </div>
      <div class="search-box__submit">
        <Button label="Search" />
      </div>
    </div>
  </form>
</div>
</template>

<script>
import Search from '@/components/Search.vue'
import Button from '@/components/Button.vue'
import SwitchBox from '@/components/SwitchBox.vue'
import HelpTooltip from '@/components/HelpTooltip.vue'

import {
  mapGetters
} from 'vuex'

export default {
  name: 'home',
  components: {
    Search,
    Button,
    SwitchBox,
    HelpTooltip
  },
  data() {
    return {
      initialMatchTones: this.$store.getters.settings.defaultMatchTones
    }
  },
  methods: {
    handleSubmit() {
      var search = this.$refs['home-search'];
      if (search.validate()) {
        var form = this.$refs['search-form']
        var query = form['search-query'].value;
        var matchTones = form['match-tones'].checked;
        this.$router.push({
          path: 'search',
          query: {
            q: query,
            ...(matchTones && {
              t: true
            })
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters(['settings'])
  }
}
</script>

<style lang="scss" scoped>
.home {
    height: 100%;
    width: 100%;
    background-color: white;
    padding: 5vh 5vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__intro {
        font-size: 2rem;
        font-weight: 200;
        margin: 0 0.5rem 3rem;
        text-align: center;
    }
}

.search-form {
    width: 100%;
}

.search-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    $this: &;
    .mq-mobile & {
        #{$this} {
            &__search {
                width: 100%;
            }

            &__options {
                width: 100%;
            }

            &__submit {
                width: 100%;
                margin-left: 0;
                margin-top: 5rem;
            }
        }
    }

    &__search {
        width: 80%;
    }

    &__options {
        width: 80%;
        // margin-top: 1rem;
        // margin-right: 1rem;
        margin: 1rem 1rem 2vh;
        display: flex;
        justify-content: flex-end;
    }

    &__submit {
        width: 80%;
    }

    &__label {
        font-size: 1.3rem;
        margin-right: 1rem;
    }

    & input[type='checkbox'] {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
    }

    &__tone-help {
        margin-left: 1rem;
    }

    & input:checked {
        & ~ .search-box__tone-checkbox {
            border-color: $colorDarkBlue;

            &:after {
                background-color: $colorOrange;
                margin-left: 3rem;
            }
        }
    }
}

// TODO: think of a better frequency strategy, average can cause problems e.g.
// 于都
// Yú dū
// Yudu county in Ganzhou 贛州|赣州, Jiangxi

// TODO: fix pinyin representation bug nu:3 shū
</style>
