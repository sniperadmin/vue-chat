<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          outlined
          color="success"
        >
          Edit
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="profile"
              v-model="valid"
            >
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Display Name *"
                    hint="this will be shown on your profile"
                    persistent-hint
                    :rules="nameRules"
                    :counter="10"
                    required
                    :value="name"
                    v-model="name"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Phone number *"
                    hint="in international format e.g (+20)"
                    :rules="phoneRules"
                    persistent-hint
                    required
                    :value="phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email *"
                    type="email"
                    :rules="emailRules"
                    required
                    :value="email"
                    v-model="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="address"
                    required
                    :value="address"
                    v-model="newAddress"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field 
                    label="Postal code"
                    :value="postcode"
                    v-model="newPostcode"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveData" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { firebase, db } from '../fb'

  export default {
    name: 'edit-form',
    // im using props here to prove to myself that i can master using them
    // these props are getting data from => ProfileMenu => Home
    props: {
      name: {
        type: String,
        default: null
      },
      phone: {
        type: String,
        default: null
      },
      email: {
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
    },
    data: () => ({
      dialog: false,
      valid: false,
      newName: '',
      nameRules: [
        v => !!v || 'Name is required!',
        v => (v && v.length <= 10 || 'Name must be less than 10 charactera')
      ],
      newPhone: '',
      phoneRules: [
        v => !!v || 'phone is required!',
        v => (/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(v)
          || 'Please Enter a valid number including international code e.g (+20)')
      ],
      newEmail: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Please Enter a valid e-mail'
      ],
      newAddress: null,
      newPostcode: null
    }),
    methods: {
      saveData () {
        let user = firebase.auth().currentUser
        if (this.$refs.profile.validate()) {
          if (user) {
            let id = user.uid
            console.log(id)
            db.collection('profiles').doc(id).update({
              name: this.newName ? this.newName : this.name,
              phone: this.newPhone ? this.newPhone : this.phone,
              email: this.newEmail ? this.newEmail : this.email,
              address: this.newAddress,
              postcode: this.newPostcode
              // photo: user.photoURL
            }).then(() => {
              console.log(`document id ${user.uid} has been updated`)
              this.dialog = false
            }).catch((err) => {
              console.error(`failed!`,err)
            })
          }
        }
      }
    },
    created () {
      // just confirming that data could be read properly from db
      let user = firebase.auth().currentUser
      if(user) {
        db.collection('profiles').doc(user.uid).onSnapshot(snap => {
          console.log(snap)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>