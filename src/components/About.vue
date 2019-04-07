<template>
<info-container>
  <info-group>
    <template v-slot:label>
      What It Is
      </template>
    <template v-slot:content>
        MandaRhyme is a rhyming dictionary for Mandarin Chinese. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, reprehenderit officia culpa, nostrum pariatur quaerat. Impedit quidem illum quam quisquam placeat consequatur assumenda dolorum necessitatibus, facere minima sit debitis amet.
      </template>
  </info-group>
  <info-group>
    <template v-slot:label>
        How it Works
      </template>
    <template v-slot:content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi eos suscipit voluptate maiores deserunt fugiat ipsam optio, totam aperiam? Incidunt quis eveniet distinctio, dolor voluptatem eos consectetur molestias molestiae quas.
      </template>
  </info-group>
  <info-group>
    <template v-slot:label>
        Want to Help?
      </template>
    <template v-slot:content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum ab soluta dolorum ad, itaque quidem numquam vero, expedita, aliquam ducimus nam aliquid possimus doloremque ex dolores, quaerat mollitia amet facilis.
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
  },
  data() {
    return {}
  }
}
</script>
