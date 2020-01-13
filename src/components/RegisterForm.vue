<template>
  <v-card outlined color="blue-grey darken-3">
    <v-card-title>
    <v-avatar>
      <img src="../assets/logo.svg" alt="test">
    </v-avatar>
      <span class="headline text-center">Register </span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-form
          ref="register"
          v-model="valid"
        >

          <v-text-field
            label="Display Name *"
            hint="will be shown on your profile"
            :rules="nameRules"
            required
            v-model="name"
          ></v-text-field>

          <v-text-field
            label="Email *"
            type="email"
            :rules="emailRules"
            required
            v-model="email"
          ></v-text-field>
          
          <v-text-field
            label="Password *"
            hint="choose a password"
            persistent-hint
            type="password"
            required
            v-model="password"
          ></v-text-field>

        </v-form>
      </v-container>
      <small>*indicates required field</small>
      <p style="color: red">
        <small>
          {{ boo }}
        </small>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="blue darken-1"
        text :disabled="!valid"
        @keydown.enter="register"
        @click="register"
        :loading="loading"
      >
        Register
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  // import { firebase, db } from '../fb';
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({
    name: 'RegisterForm',
  })

  export default class RegisterForm extends Vue {
    @Prop({ type: String, required: true }) public readonly name: string;
    @Prop({ type: String, required: true }) public readonly phone: string;
    @Prop({ type: String, required: true }) public readonly email: string;
    @Prop({ type: String, required: true }) public readonly address: string;
    @Prop({ type: String, required: true }) public readonly postcode: string;

    public valid: boolean = true;
    public name: string,
    public nameRules: array = [
      (v) => !!v || 'Name is required!',
      (v) => (v && v.length <= 10 || 'Name must be less than 10 charactera'),
    ]
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

    public phone: string,
    public address: string,
    public postcode: string,
    public photo: string = 'https://lh5.googleusercontent.com/-U1TFOGH-4DQ/AAAAAAAAAAI/AAAAAAAAAuE/tS4M30mPvU8/photo.jpg',
    public boo: string;
    public loading: boolean = false;

    public register() {
      // this.loading = true
      // if (this.$refs.register.validate()) {

      //   // [START createwithemail]
      //   let email = this.email,
      //     password = this.password
      //     // userRegisteredName = this.name

      //   firebase.auth().createUserWithEmailAndPassword(email, password)
      //     .then((result) => {

      //       // const token = result.credential.accessToken
      //       // console.log(token)

      //       const { user } = result

      //       // update displayName
      //       user.updateProfile({ displayName: this.name })

      //       db.collection('profiles').doc(user.uid).set({
      //         name: this.name,
      //         phone: user.phoneNumber,
      //         address: null,
      //         id: user.uid,
      //         email: user.email,
      //         liveStatus: null,
      //         photo: this.photo
      //       })

      //       this.loading = false
      //       this.$router.push('/')
      //     })
      //     .catch(error => {
      //       this.loading = false
      //       if (error.code === 'auth/email-already-in-use') {
      //         return
      //       } else if (error.code === 'auth/weak-password') {
      //         this.boo = error.message
      //         return
      //       }
      //       this.boo = error.message
      //     })
      //     // [END createwithemail]
      //   }
    }
  }
</script>

<style lang="scss" scoped>

</style>