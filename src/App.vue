<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <h3>Vue-Chat-TypeScript</h3>
        <v-badge class="mx-2">
          by Nasr Galal
        </v-badge>
      </div>

      <v-spacer></v-spacer>

      <!-- some content here -->
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
});
</script>
