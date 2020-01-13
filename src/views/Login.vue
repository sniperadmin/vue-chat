<template>
<v-container>
  <v-layout
      text-center
      wrap
    >
      
      <Vuetify-logo :height="80" />

      <v-flex mb-4>
        <h5 class="display-1 font-weight-bold mb-3">
          login page
        </h5>
      </v-flex>

      <!-- google sign in -->
      <v-flex xs12 mb-4>
        <v-btn class="mx-2" dark color="pink" @click="loginGoogle">
          <v-icon dark class="mx-2">mdi-google</v-icon>
          sign in via google
        </v-btn>
      </v-flex>

      <v-row justify="center">
        <v-col cols="12" md="10" sm="8">
          <Tabs />
        </v-col>
      </v-row>

  </v-layout>
</v-container>
</template>

<script lang="ts">
  import firebase from 'firebase'
  import { db } from '../fb'
  import Tabs from '@/components/Tabs'
  import VuetifyLogo from '@/components/VuetifyLogo'

  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'login',
    components: {
      Tabs,
      VuetifyLogo,
    },
  })
  export default class Login extends Vue {
    public snackbar: boolean = false

    public loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly') // this is to request contacts from user

      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken
        // console.log(token)

        // The signed-in user info.
        const { user }: any = result

        window.localStorage.setItem('user', JSON.stringify(user))

        // Add a new document with a generated id.
        db.collection('profiles').doc(user.uid).set({
              name: user.displayName,
              phone: user.phoneNumber,
              address: null,
              postcode: null,
              id: user.uid,
              email: user.email,
              liveStatus: null,
              photo: user.photoURL,
            })
            .then(() => {
              // console.log(`Document written with ID: ${user.uid}`)
            })
            .catch(() => {
              // console.error(`Error adding document: `, error)
            })

        this.$router.push('/')

      }).catch(() => {
        // console.error('error sign in with google', error)
      })
    }
}
</script>

<style scoped>

</style>