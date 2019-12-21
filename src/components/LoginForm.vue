<template>
  <v-card outlined color="blue-grey darken-3">
    <v-card-title>
    <v-avatar>
      <img src="../assets/logo.svg" alt="test">
    </v-avatar>
      <span class="headline text-center">login </span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-form
          ref="login"
          v-model="valid"
        >
          <v-text-field
            label="Email *"
            type="email"
            :rules="emailRules"
            required
            v-model="email"
          ></v-text-field>

          <v-text-field
            label="password *"
            type="password"
            :rules="passwordRules"
            required
            v-model="password"
          ></v-text-field>

        </v-form>
      </v-container>
      <small>*indicates required field</small>
      <p style="color: red">
        <small v-if="boo">{{ boo }}</small>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text :disabled="!valid"
        @keydown.enter="login"
        @click="login"
        :loading="loading"
      >
        Login
      </v-btn>
      
    </v-card-actions>
  </v-card>
</template>

<script>
  import { firebase } from '../fb'

  export default {
    name: 'login-form',
    data: () => ({
      valid: true,
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
      boo: null,
      loading: false
      // reminder for me to add validations
    }),
    methods: {
      login () {
        this.loading = true
        let email = this.email,
          password = this.password;
        
        if (this.$refs.login.validate()) {
          
          firebase.auth().signInWithEmailAndPassword(email, password)
          .then((result) => {
            
            const { user } = result
            window.localStorage.setItem('user', JSON.stringify(user))
            this.loading = false
            this.$router.push('/');

          })
          .catch((err) => {
            this.loading = false
            this.boo = err.message
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>