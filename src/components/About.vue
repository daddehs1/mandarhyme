<template>
<info-container>
  <info-group>
    <template v-slot:label>
      What It Is
      </template>
    <template v-slot:content>
        <p><span class="u-emphasis">MandaRhyme</span> is a rhyming dictionary for Mandarin Chinese.</p>
        <p>Enter a search phrase and find a list of words that rhyme!</p>
        <p>All words and definitions are derived from the <a href="https://cc-cedict.org/wiki/" class="u-nowrap">CC-CEDICT</a> Chinese-English dictionary.</p>
      </template>
  </info-group>
  <info-group>
    <template v-slot:label>
        How it Works
      </template>
    <template v-slot:content>
        <p>As in any language, rhymes in Mandarin Chinese are determined by vowel sounds.</p>
        <p>Two words are considered to rhyme if the vowel sound <span class="u-info-aside">(i.e. final)</span> is the same.</p>
        <p>Multi-syllable words <span class="u-info-aside">(words with more than one character)</span>, are considered to rhyme if each corresponding syllabe rhymes.</p>
      </template>
  </info-group>
  <info-group>
    <template v-slot:label>
        Want to Help?
      </template>
    <template v-slot:content>
          <p><span class="u-emphasis">MandaRhyme</span> is open-source and contributions are always welcome!</p>
          <p>Visit the <a href="https://github.com/daddehs1/mandarhyme" class="u-nowrap">MandaRhyme github</a> to view the source code and any listed issues.</p>
          <p>Also check out the <a href="https://github.com/daddehs1/mandarin-rhymes" class="u-nowrap">Mandarin-Rhymes github</a> for the companion node module.</p>
      </template>
  </info-group>
</info-container>
</template>

<script>
import InfoContainer from '@/components/InfoContainer.vue'
import InfoGroup from '@/components/InfoGroup.vue'

export default {
  name: 'about',
  components: {
    InfoContainer,
    InfoGroup
  }
}
</script>
