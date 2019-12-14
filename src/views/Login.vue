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
        <v-col cols="5">
          <Tabs />
        </v-col>
      </v-row>

    
  </v-layout>
</v-container>
</template>

<script>
  import firebase from 'firebase'
  import { db } from '../fb'
  import Tabs from '@/components/Tabs'
  import VuetifyLogo from '@/components/VuetifyLogo'

  export default {
    name: 'login',
    components: {
      Tabs,
      VuetifyLogo
    },
    methods: {
      loginGoogle () {
        const provider = new firebase.auth.GoogleAuthProvider()
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

        firebase.auth().signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          console.log(token)
          // The signed-in user info.
          const { user } = result

          // Add a new document with a generated id.
            db.collection('profiles').doc(user.uid).set({
                name: user.displayName,
                phone: user.phoneNumber,
                address: null,
                postcode: null,
                id: user.uid,
                email: user.email,
                liveStatus: null,
                photo: user.photoURL
              })
              .then(() => {
                console.log(`Document written with ID: ${user.uid}`)
              })
              .catch(error => {
                console.error(`Error adding document: `, error)
              })

          this.$router.push('/')

        }).catch((error) => {
          console.error('error sign in with google', error)
        })
      }
    },
    register() {
        // Sign in with email and pass.
        // [START createwithemail]
        let email = this.email,
          password = this.password

        // set validation here

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((result) => {

            const { user } = user

            const token = result.credential.accessToken
            console.log(token)

            // Add a new document with a generated id.
            db.collection('profiles').doc(user.user.uid).set({
                name: this.name,
                phone: null,
                address: null,
                postcode: null,
                id: user.user.uid,
                email: this.email
              })
              .then(() => {
                console.log(`Document written with ID: ${user.user.uid}`)
              })
              .catch(error => {
                console.error(`Error adding document: `, error)
              })

            this.$router.replace('/')
          })
          .catch(error => {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message

            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.')
            } else {
              this.boo = errorMessage
            }
            // console.log(error)
            alert(error)
            // [END_EXCLUDE]
          })
        // [END createwithemail]
  },
  computed: {
    activeFab () {
      switch (this.tabs) {
        case 'one':
          return {
            label: 'Display Name *',
            hint: 'this will be shown on your profile',
            rules: this.nameRules,
            model: this.name
          }
        case 'two': return { color: 'red', icon: 'mdi-edit' }
        case 'three': return { color: 'green', icon: 'mdi-keyboard_arrow_up' }
        default: return {}
      }
    },
  }
}
</script>

<style scoped>

</style>