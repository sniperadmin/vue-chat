<template>
  <v-flex>
    <v-card outlined color="blue-grey darken-3">
      <v-card-title>
      <v-avatar>
        <img src="../assets/logo.svg" alt="test">
      </v-avatar>
        <span class="headline text-center">login</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="login"
            v-model="valid"
          >
            

            <v-text-field
              label="Display Name *"
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

          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text>Close</v-btn>
        <v-btn color="blue darken-1" text :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: 'login-form',
    data: () => ({
      valid: true,
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
  }
</script>

<style lang="scss" scoped>

</style>