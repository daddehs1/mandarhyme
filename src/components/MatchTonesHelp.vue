<template>
<info-container>
  <info-group>
    <!-- <template v-slot:label>
        How it Works
      </template> -->
    <template v-slot:content>
        <p><span class="u-emphasis">Tone Matching</span> adds an additional layer of "rhyming" on top of rhyming by vowel sound.</p>
        <p>If enabled, search results will only return words that rhyme and have a the same sequence of tones as the search phrase.</p>
      </template>
  </info-group>
  <info-group>
    <template v-slot:label>
        Example
      </template>
    <template v-slot:content>
        <p>Searching rhymes for <span class="u-nowrap"><span class="u-bold">能力</span> <span class="u-info-aside u"> (pinyin: néng lì)</span></span>:</p>
        <p>Without <span class="u-emphasis">Tone Matching</span>,
          both <span class="u-nowrap"><span class="u-bold">生意</span> <span class="u-info-aside"> (pinyin: shēng yi)</span></span>
          and <span class="u-nowrap"><span class="u-bold">成绩</span> <span class="u-info-aside"> (pinyin: chéng jì)</span></span>
          will return as a result.
        </p>
        <p>With <span class="u-emphasis">Tone Matching</span>,
          only <span class="u-bold">成绩</span>
          will return as a result because it has the same sequence of tones as <span class="u-bold">能力</span>
          <span class="u-info-aside"> (2nd tone followed by 4th tone)</span>.
        </p>
      </template>
  </info-group>
</info-container>
</template>

<script>
import InfoContainer from '@/components/InfoContainer.vue'
import InfoGroup from '@/components/InfoGroup.vue'

export default {
  name: 'match-tones-help',
  components: {
    InfoContainer,
    InfoGroup
  }
}
</script>
