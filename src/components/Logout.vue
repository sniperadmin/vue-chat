<template>
    <v-flex>
      <v-btn @click="logout" color="error">
        <v-icon>mdi-power</v-icon>
        logout
      </v-btn>
    </v-flex>
</template>

<script lang="ts">
  import { Vue, Component, Emit } from 'vue-property-decorator'

  @Component({
    name: 'Logout',
  })
  export default class Logout extends Vue {
    public logout() {
      this.$emit('click') // should be modified
    }
  }
</script>

<style lang="scss" scoped>

</style>