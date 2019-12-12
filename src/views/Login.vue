<template>
<v-container>
  <v-layout
      text-center
      wrap
    >
    <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="100"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h5 class="display-1 font-weight-bold mb-3">
          login page
        </h5>
      </v-flex>

    <!-- google sign in -->
    <v-flex xs12>
      <v-btn class="mx-2" dark color="pink" @click="loginGoogle">
        <v-icon dark class="mx-2">mdi-google</v-icon>
        sign in via google
      </v-btn>
    </v-flex>

    <v-flex>
      <!-- <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        >
        </v-text-field>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="login"
        >
          Login
        </v-btn>
      </v-form> -->
    </v-flex>

  </v-layout>
</v-container>
</template>

<script>
  import firebase from 'firebase'
  import { db } from "../fb"

  export default {
    name: 'login',
    data: () => ({
      valid: true,
      fab: false,
      hidden: false,
      tabs: null,
      name: null,
      nameRules: [
        v => !!v || 'Name is required!',
        v => (v && v.length <= 10 || 'Name must be less than 10 charactera')
      ],
      email: null,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Please Enter a valid e-mail'
      ],
      password: null,
      passwordRules: [
        v => !!v || 'Password is required!',
        v => (v && v.length >= 6 || 'Name must be more than 6 charactera')

      ],
      phone: null,
      address: null,
      postcode: null,
      boo: null
      // reminder for me to add validations
    }),
    methods: {
      loginGoogle () {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          console.log(token)
          // The signed-in user info.
          const {
            user
          } = result

          console.log(user)

          // Add a new document with a generated id.
            db.collection("profiles").doc(user.uid).set({
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
                console.log("Document written with ID: ")
              })
              .catch(error => {
                console.error("Error adding document: ", error)
              })

          this.$router.push('/');
        }).catch((error) => {
          console.error('error sign in with google', error)
        })
      },
      login () {
        let email = this.email,
          password = this.password;
        
        if (this.$refs.form.validate()) {
          
          
          firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            
            console.log('logged in successfully!')

            this.$router.push('/');

          })
          .catch((err) => console.error('error login!', err))
        }
    },
    register() {
        // Sign in with email and pass.
        // [START createwithemail]
        let email = this.email,
          password = this.password

        // set validation here

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {

            // Add a new document with a generated id.
            db.collection("profiles").doc(user.user.uid).set({
                name: this.name,
                phone: null,
                address: null,
                postcode: null,
                id: user.user.uid,
                email: this.email
              })
              .then(() => {
                console.log("Document written with ID: ")
              })
              .catch(error => {
                console.error("Error adding document: ", error)
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
      }
  },
   computed: {
    activeFab () {
      switch (this.tabs) {
        case 'one': return { color: 'success', icon: 'mdi-share' }
        case 'two': return { color: 'red', icon: 'mdi-edit' }
        default: return {}
      }
    }
  }
}
</script>

<style scoped>

</style>