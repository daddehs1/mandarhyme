<template>
<div class="search-results">
  <div class="search-results__heading">

    <!-- title displaying the search query -->
    <h3 class="search-results__title">
      Words Rhyming with
      <span class="search-results__characters">{{this.$route.query.q}}</span>
      <div class="search-results__match-tone-message" v-if="this.$route.query.t"> (matching tones)</div>
    </h3>

    <mq-layout mq="laptop+">
      <!-- link to Home view -->
      <router-link class="search-results__reset" :to="{ name: 'home'}"><span>search again</span></router-link>
    </mq-layout>
  </div>

  <!-- element which contains search results -->
  <ul @scroll="updateScroll" ref="rhymeList" class="rhyme-list">
    <!-- render list of data fetched from api -->
    <li v-for="rhyme in this.sortedRhymeList" class="rhyme-list__item">
      <!-- pass rhyme as parameter to various functions to retrieve appropritate info to display based on settings -->
      <h4 class="rhyme-list__word">{{characters(rhyme)}}</h4>
      <span class="rhyme-list__pronunciation">{{pronunciation(rhyme)}}</span>
      <span class="rhyme-list__definition"> {{joinDefinitions(rhyme.definitions)}}</span>
    </li>
  </ul>

  <mq-layout mq="laptop+">
    <!-- display a ... to indicate that additional words can be seen by scrolling -->
    <span class="search-results__scroll-remaining" :class="scrollRemainingClassObject">…</span>
  </mq-layout>
</div>
</template>

<script>
const axios = require('axios');

import {
  mapGetters
}
from 'vuex'

export default {
  data() {
    return {
      // list of rhymes, initially null until data fetched from api
      rhymeData: null,
      // used to determine whether further rhymes can be revealed by scrolling
      scrollRemaining: false
    }
  },
  methods: {
    // returns appropriate character set based on settings
    characters(rhyme) {
      return this.settings.characterSet ? rhyme.traditional : rhyme.simplified;
    },
    // returns a string of definitions from array
    joinDefinitions(definitions) {
      return definitions.join("; ");
    },
    // returns appropriate pronunciation style based on settings
    pronunciation(rhyme) {
      return this.settings.pronunciationSet ? rhyme.zhuyinArray.join(" ") : rhyme.pinyin;
    },
    // calculates whether or not rhymeList is scrolled all the way down
    updateScroll() {
      var element = this.$refs.rhymeList;
      // give tolerance so it doesn't have to be exactly at end
      const SCROLL_REMAIN_TOLERANCE = 5;
      this.scrollRemaining = element.scrollHeight - element.scrollTop - element.clientHeight > SCROLL_REMAIN_TOLERANCE;
    }
  },
  computed: {
    ...mapGetters(['settings']),
    // helper to bind class to scroll remaning "..." span element
    scrollRemainingClassObject() {
      return {
        // modifier class to signify rhymeList is not all the way scrolled down
        'search-results__scroll-remaining--invisible': !this.scrollRemaining
      }
    },
    // returns appropriate rhyme list:
    // if rhymeData exists (i.e. api fetch promise has been fulfilled), display api call results
    // else display dummy "ryhme" to act as loading screen
    rhymeList() {
      return this.rhymeData ? this.rhymeData.rhymes : [{
        simplified: "...",
        traditional: "...",
        pinyin: "loading rhymes",
        zhuyinArray: ['loading rhymes'],
        definitions: ["Please wait a moment!"]
      }]
    },
    // sort rhymeList based on appropriate setting
    sortedRhymeList() {
      //define sort function for alphabetic sort setting
      var alphabetSort = (a, b) => {
        // removes diacritic to find true alphabetic order by pinyin
        // NDF decomposes graphemes, e.g. 'è'' turns into 'e  ̀'
        // then diacritics removed by RegExp
        // also puts everything to lowerCase
        var nonAlphaRegExp = /[^a-zA-Z]/g;
        var cleanAPinyin = a.pinyin.normalize('NFD').replace(nonAlphaRegExp, "").toLowerCase();
        var cleanBPinyin = b.pinyin.normalize('NFD').replace(nonAlphaRegExp, "").toLowerCase();
        if (cleanAPinyin < cleanBPinyin) return -1
        if (cleanAPinyin > cleanBPinyin) return 1;
        return 0;
      }
      // define sort function for frequency sort setting
      // note, as defined in api, lower averageFrequency signifies a MORE frequently used word
      // handle special case null, signifies very rare words
      //   therefore must avoid default behavior in JS where null < 1
      var frequencySort = (a, b) => {
        if (a.averageFrequency == null && b.averageFrequency == null) return 0
        if (b.averageFrequency == null) return -1
        if (a.averageFrequency == null) return 1
        return a.averageFrequency - b.averageFrequency;
      }
      // sort array based on appropriate setting
      var sortFunction = this.settings.defaultSortOrder ? alphabetSort : frequencySort;
      return this.rhymeList.sort(sortFunction);
    }

  },
  created() {
    // scrolls to the top of the window
    // avoids undesired behavior in mobile where scroll is carried over from Home view
    window.scrollTo(0, 0);

    // fetch data from api with query and options
    var searchQuery = this.$route.query.q;
    var matchTones = this.$route.query.t;
    axios.get('https://api.mandarhyme.com/search', {
      params: {
        q: searchQuery,
        t: matchTones
      }
    }).then(results => {
      // if results is not empty, update RhymeData with search results
      // else use dummy "ryhme" to act as "no results" message
      this.rhymeData = results.data.rhymes.length ? results.data : {
        rhymes: [{
          simplified: ":(",
          traditional: ":(",
          pinyin: "sorry",
          zhuyinArray: ['sorry'],
          definitions: ["no rhyming words found!"]
        }]
      };
      // after rendering rhymeList, call updateScroll
      // this allows the scroll remaining ... to display without waiting for first scroll to trigger update
      this.$nextTick(this.updateScroll)
    });
  }
}
</script>

<style lang="scss">
.search-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    height: 100%;

    &__heading {
        //margin-bottom: 1rem;
        text-align: center;
    }

    &__match-tone-message {
        font-size: 1.4rem;
    }

    &__title {
        font-size: 2rem;
        font-weight: 400;
    }

    &__reset {
        width: fit-content;
        font-size: 1.4rem;
        font-weight: 400;
        color: $colorDarkOrange;
        letter-spacing: 0.5px;
    }

    &__characters {
        color: $colorDarkBlue;
        font-weight: 600;
    }

    &__scroll-remaining {
        font-size: 2rem;
        line-height: 2rem;
        color: $colorOrange;
        opacity: 100;
        transition: opacity 0.2s;

        &--invisible {
            opacity: 0;
        }
    }
}

.rhyme-list {
    border-top: 1px solid $colorDarkBlue;
    border-bottom: 1px solid $colorDarkBlue;
    margin: 1rem 1rem 1rem 2.5%;
    flex: 1 1 auto;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    min-height: 0;
    width: 95%;
    // scroll-snap-type: y proximity;
    // scroll-padding: 0.5rem;

    &__item {
        //scroll-snap-align: end;
        list-style: none;
        display: grid;
        padding: 1rem;
        grid-template-areas: "word pronunciation" "word definitions";
        grid-template-columns: max-content auto;
        align-items: center;

        &:not(:last-of-type) {
            border-bottom: 1px dashed $colorDarkBlue;
        }
    }

    &__word {
        font-size: 2.8rem;
        font-weight: 600;
        color: $colorDarkBlue;
        grid-area: word;
        margin-right: 1.6rem;
    }

    &__pronunciation {
        font-size: 1.6rem;
        font-weight: 400;
        color: $colorOrange;
        grid-area: pronunciation;
    }

    &__definition {
        font-size: 1.6rem;
        font-weight: 400;
        grid-area: definitions;
    }
}
</style>
