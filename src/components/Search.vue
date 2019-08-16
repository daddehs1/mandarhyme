<template>
<div class="search" :class="classObject">

  <!-- container for error message text if input fails validation -->
  <div class="search__error">{{this.errorMessage}}</div>

  <!-- input which holds search search query
  validates on every input -->
  <input @input="validate" v-model="searchQuery" type="text" class="search__input" name="search-query" />
  <!-- question mark search icon -->
  <search-icon class="search__icon"></search-icon>
</div>
</template>

<script>
import {
  SearchIcon
} from 'vue-feather-icons'
export default {
  name: 'Search',
  components: {
    SearchIcon
  },
  data() {
    return {
      // search query v-modeled to input
      searchQuery: "",
      // whether or not the input has failed most recent validation
      hasError: false,
      // error message to be displayed in error container
      errorMessage: ""
    }
  },
  methods: {
    /**
     * [method used to validate search query with following rules:
          1. Must contain at least 1 character
          2. Must only contain Chinese characters (hanzi)]
     * @return {[boolean]}      [whether validation has passed]
     */
    validate() {
      //var hanziRegex = /^(\p{Script=Hani})+$/gu;
      var hanziRegex = /^[\u4e00-\u9fa5]+$/
      if (this.searchQuery == "") {
        this.hasError = true;
        this.errorMessage = "Please enter at least one character";
      } else if (!(hanziRegex.test(this.searchQuery))) {
        this.hasError = true;
        this.errorMessage = "Please enter only Chinese Characters";
      } else {
        this.hasError = false;
        this.errorMessage = "";
      }
      return !this.hasError;
    }
  },
  computed: {
    // helper to bind class to component root
    classObject() {
      return {
        // modifier class to signify input has error
        "search--error": this.hasError
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
    position: relative;

    &__error {
        height: 3rem;
        margin-left: 1rem;
        color: $colorDeepRed;
        cursor: default;
        opacity: 0;
        font-size: 1.5rem;
    }

    &__icon {
        color: $colorGrey;
        position: absolute;
        // used to center icon
        // 12px refers to half of the icon height
        top: calc(50% - 12px + 1.5rem);
        right: 1rem;
        transition: 0.3s all ease;
    }

    &__input {
        // unfo default appearance
        -webkit-appearance: none;
        height: 4rem;
        width: 100%;
        background-color: white;
        border-radius: 0;
        border: 2px solid $colorGrey;
        text-align: right;
        padding: 0 5rem 0 2.5rem;
        font-size: 1.8rem;
        text-align: left;
        transition: 0.3s all ease;

        &:focus {
            outline: none;
            border-color: $colorDarkOrange;

            & ~ .search__icon {
                color: $colorDarkBlue;
            }
        }
    }

    // if input has error
    &--error {
        .search {
            &__error {
                cursor: text;
                opacity: 100;
            }

            &__input {
                border-color: $colorDeepRed;
                box-shadow: 0 0 1px 0.5px rgba($colorDeepRed, .6);
            }

            &__icon {
                color: $colorDeepRed !important;
            }
        }
    }
}
</style>
