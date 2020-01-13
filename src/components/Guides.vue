<template>
  <v-row>
    <v-col cols="12">
      <v-row justify="center">
        <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
          outlined
          dense
          prominent
        >
          <p>Indicators</p>
          <v-divider></v-divider>
          <p class="mt-3">
            <v-icon color="green">mdi-account-circle</v-icon>
            online 
            <v-icon color="red">mdi-account</v-icon>
            offline
          </p>
        </v-alert>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    name: 'Guides',
  })
  export default class Guides extends Vue {}
</script>

<style lang="scss" scoped>

</style>