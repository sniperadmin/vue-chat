<template>
  <v-menu
      :close-on-content-click="false"
      :nudge-width="230"
      left
      top
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="info">
          <v-icon>mdi-account</v-icon>
          profile
        </v-btn>
      </template>

      <v-card>
         <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="profileImg" >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ username }}</v-list-item-title>
              <v-list-item-subtitle>{{ useremail }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <edit-form />
            </v-list-item-action>
          </v-list-item>
         </v-list>
        <!-- <v-divider></v-divider> -->
      </v-card>

    </v-menu>
</template>

<script>
import EditForm from "@/components/EditForm";
  export default {
    name: 'profile-menu',
    components: {
      EditForm
    },
    props: {
      profileImg: {
        type: String,
        default: null
      },
      username: {
        type: String,
        default: null
      },
      useremail: {
        type: String,
        default: null
      }
    },
    data: () => ({
      menu: false, // turning on/off the menu
    })
  }
</script>

<style lang="scss" scoped>

</style>