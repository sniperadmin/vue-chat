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
              <!-- edit form -->
              <edit-form :name="username" :email="useremail" :phone="phone" :address="address" :postcode="postcode" class="mx-auto" />
            </v-list-item-action>
          </v-list-item>
         </v-list>

        <v-divider></v-divider>

        <v-list-item-action class="mx-5">
          <v-row>
            <v-col>
              <v-btn color="error" outlined disabled>
                <v-icon>mdi-lock-reset</v-icon>
                reset password
              </v-btn>
            </v-col>
            <v-col>
              <v-btn color="error" outlined disabled>
                <v-icon>mdi-delete</v-icon>
                delete account
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item-action>
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
      },
      phone: {
        type: String,
        default: null
      },
      address: {
        type: String,
        default: null
      },
      postcode: {
        type: String,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>