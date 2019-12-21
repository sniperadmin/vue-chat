<template>
  <v-img
    :src="require('../assets/logo.svg')"
    class="my-3"
    contain
    :height="height"
  ></v-img>
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