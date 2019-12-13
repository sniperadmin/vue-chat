<template>
  <v-btn @click="logout" color="error">
    <v-icon>mdi-power</v-icon>
    logout
  </v-btn>
</template>

<script>
  export default {
    methods :{
      logout () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>