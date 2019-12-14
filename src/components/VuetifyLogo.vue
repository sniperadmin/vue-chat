<template>
  <v-flex xs12>
    <v-img
      :src="require('../assets/logo.svg')"
      class="my-3"
      contain
      :height="height"
    ></v-img>
  </v-flex>
</template>

<script>
  export default {
    name: 'vuetify-logo',
    props: {
      height: {
        type: Number,
        default: 50
      }
    }
  }
</script>

<style scoped>

</style>