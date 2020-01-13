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

<script lang="ts">
  // import { firebase } from '../fb'
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({
    name: 'LoginForm',
  })

  export default class LoginForm extends Vue {
    @Prop({ type: String, required: true }) public readonly name: string;
    @Prop({ type: String, required: true }) public readonly phone: string;
    @Prop({ type: String, required: true }) public readonly email: string;
    @Prop({ type: String, required: true }) public readonly address: string;
    @Prop({ type: String, required: true }) public readonly postcode: string;

    public valid: boolean = true;
    public email: string;
    public emailRules: array = [
      (v) => !!v || 'Email is required',
      (v) => /.+@.+\..+/.test(v) || 'Please Enter a valid e-mail'
    ];
    public password: string;
    public passwordRules: array = [
      (v) => !!v || 'Password is required!',
      (v) => (v && v.length >= 6 || 'Name must be more than 6 charactera')
    ];
    public boo: string;
    public loading: boolean = false;


    public login() {
      // this.loading = true
      // let email = this.email,
      //   password = this.password;

      // if (this.$refs.login.validate()) {

      //   firebase.auth().signInWithEmailAndPassword(email, password)
      //   .then((result) => {

      //     const { user } = result
      //     window.localStorage.setItem('user', JSON.stringify(user))
      //     this.loading = false
      //     this.$router.push('/');

      //   })
      //   .catch((err) => {
      //     this.loading = false
      //     this.boo = err.message
      //   })
      // }
    }
  }
</script>

<style lang="scss" scoped>

</style>