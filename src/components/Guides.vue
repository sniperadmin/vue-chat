<template>
  <v-flex>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
        <v-alert
          border="top"
          colored-border
          type="info"
          elevation="2"
          outlined
          dense
        >
          <p>Indicators</p>
          <p>
            <v-icon color="green">mdi-account-circle</v-icon>
            online
          </p>
          <p>
            <v-icon color="red">mdi-account</v-icon>
            offline
          </p>
        </v-alert>
        </v-row>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script>
  export default {
    name: 'guides'
  }
</script>

<style lang="scss" scoped>

</style>