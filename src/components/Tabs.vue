<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="blue-grey darken-3"
      centered
      dark
      icons-and-text
      grow
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        Register
      </v-tab>

      <v-tab>
        Login
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
      >
        <v-card flat>
          <v-card-text>
            <!-- <v-alert
              outlined
              type="warning"
              prominent
              border="left"
            >
              under construction
            </v-alert> -->
              <Register-form />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-text>
            <!-- <v-alert
              outlined
              type="warning"
              prominent
              border="left"
            >
              under construction
            </v-alert> -->
          <Login-form></Login-form>
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs-items>
  </v-card>
</template>
<script>
  import LoginForm from '@/components/LoginForm'
  import RegisterForm from '@/components/RegisterForm'
  export default {
    name: 'tabs',
    components: {
      LoginForm,
      RegisterForm
    },
    data () {
      return {
        tab: null
      }
    }
  }
</script>