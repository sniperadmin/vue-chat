<template>

    <v-list
      subheader
      two-line
      align="center"
      justify="center"
      style="min-height: 400px"
      avatar
      color="indigo lighten-1"
    >
      <v-list-item dark v-for="user in users" :key="user.uid">
        <v-list-item-avatar>
          <v-img :src="user.photo" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon v-if="user.liveStatus === 'online'" color="green">mdi-account-circle</v-icon>
          <v-icon v-else color="red">mdi-account</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
</template>

<script>
  export default {
    name: 'users',
    props: {
      users: {
        type: Array,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>