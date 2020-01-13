<template>
  <v-flex xs12 >
    <h5 class="display-1 font-weight-bold mb-3">
      vuejs-vuetify-chat app
    </h5>
</v-flex>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({
    name: 'Hero',
  })
  export default class Hero extends Vue {}
</script>

<style lang="scss" scoped>

</style>