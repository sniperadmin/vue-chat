<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <!-- logo -->
      <Vuetify-logo></Vuetify-logo>
      <!-- hero [title] -->
      <Hero />
      <!-- buttons -->
      <v-flex xs12 v-if="currentUser">
        <profile-menu
          :profileImg="authUser.photo"
          :username="authUser.name"
          :useremail="authUser.email"
          :phone="authUser.phoneNumber"
          :address="authUser.address"
          :postcode="authUser.postcode"
        />
        <Logout @click="logout" />
      </v-flex>

      <!-- guides -->
      <v-flex xs12>
        <Guides />
      </v-flex>
      
      <!-- the actual app here -->
      <v-row dense no-gutters>
        <v-col cols="12">
          <v-layout row>
              <!-- typer -->
              <Typer :authUser="authUser" />
              <!-- ./typer -->

            <!-- chat preview -->
            <v-row dense no-gutters>
              <!-- first col [users] -->
              <v-col cols="3">
                <!-- row#1 -->
                <v-row no-gutters>
                  <v-col>
                    <v-card tile flat color="blue-grey darken-2" :loading="loading">
                      All users ({{ users.length }})
                    </v-card>
                  </v-col>
                </v-row>

                <!-- row#2 -->
                <v-row no-gutters>
                  <v-col cols="12">
                    <!-- users component -->
                    <Users :users="users" />
                  </v-col>
                </v-row>
              </v-col>

              <!-- second col [messages] -->
              <v-col cols="9">
                <!-- row#1 -->
                <v-row no-gutters>
                  <v-col>
                    <v-card tile flat color="blue-grey darken-2" :loading="loading">
                      Recent Chat
                    </v-card>
                  </v-col>
                </v-row>

                <!-- row#2 -->
                <v-row dense no-gutters>
                  <v-col>
                    <!-- messages component -->
                    <Messages :messages="messages" :authUser="authUser" />
                  </v-col>
                </v-row>
              </v-col>

            </v-row>
          </v-layout>
        </v-col>
      </v-row>
    </v-layout>
    
    <v-snackbar
      v-model="snackbar"
      right
      top
    >
       <span v-if="appOn">
         {{ notifications[1] }}
       </span>
       <span v-if="!appOn">
         {{ notifications[2] }}
       </span>
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>
  // import firebase from 'firebase'
  import { firebase, db } from '../fb'
  import VuetifyLogo from '@/components/VuetifyLogo'
  import ProfileMenu from '@/components/ProfileMenu'
  import Hero from '@/components/Hero'
  import Guides from '@/components/Guides'
  import Typer from '@/components/Typer'
  import Users from '@/components/Users'
  import Messages from '@/components/Messages'
  import Logout from "@/components/Logout";

  const firestoreDb = firebase.firestore()
  const oldRealTimeDb = firebase.database()

  const usersRef = firestoreDb.collection('profiles') // Get a firestore reference to the Users collection
  const onlineRef = oldRealTimeDb.ref('.info/connected') // Get a database reference to the list of connections

  // @ is an alias to /src
  export default {
    name: 'home',
    components: {
      VuetifyLogo,
      ProfileMenu,
      Hero,
      Guides,
      Typer,
      Users,
      Messages,
      Logout
    },
    data: () => ({
      messages: [],
      currentUser: [],
      users: [],
      isActive: '',
      authUser:{},
      profileImg:'https://lh5.googleusercontent.com/-U1TFOGH-4DQ/AAAAAAAAAAI/AAAAAAAAAuE/tS4M30mPvU8/photo.jpg',
      loading: false,
      snackbar: false,
      notifications: ['logged In!', 'App Online!', 'App Offline'],
      appOn: false
    }),
    methods: {
      logout() {
        let user = firebase.auth().currentUser
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          // updating liveStatus in firestore
          usersRef.doc(user.uid).update({
              liveStatus: 'offline'
            })
        }).catch(() => {
          // An error happened.
        })
      },
      fetchMsg () {
        db.collection('chat').orderBy('createdAt').onSnapshot((querySnapShot) => {
          // create caching
          const allMsgs = []
          // cash docs
          querySnapShot.forEach((doc) => {
              allMsgs.push(doc.data())
          })
          // inject cashed messages into props
          this.messages = allMsgs
        })
      },
      fetchUsers () {
        this.loading = true
         db.collection('profiles').onSnapshot((querySnapShot) => {
          // create caching
          const allUsers = []
          // cash docs
          querySnapShot.forEach((doc) => {
              allUsers.push(doc.data())
          })
          // inject cashed messages into props
          this.users = allUsers
        })
        this.loading = false
      }
    },
    created () {
      let user = firebase.auth().currentUser
      if (user) {
        onlineRef.on('value', (snapshot) => {
          if (snapshot.val() === true) { // if vlaue is true
            this.appOn = true
            this.snackbar = true

            usersRef.doc(user.uid).update({
              liveStatus: 'online'
            })
          } else {
            this.appOn = false
          }
        })

        this.isActive = user.liveStatus
        this.authUser = user
        this.profileImg = this.authUser.photoURL
        const allUsers = []
        allUsers.push(user)
        this.currentUser = allUsers
        } else {
          this.authUser = {}
        }
        this.fetchMsg()
        this.fetchUsers()


        // Note: in case if I would capture all users using admin SDK this is the code
        // but it is much more slower than DB

        // this.loading = true
        // axios.get('https://us-central1-chat-app-f412a.cloudfunctions.net/listUsers').then(response => {
        //   this.users = response.data.users
        //   this.loading = false
        //   // this.users.forEach((user) => {
            
        //   // })
        // }).catch(err => console.log(err))
      },
      beforeRouteEnter(to, from, next) {
        next(vm => {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              // eslint-disable-next-line callback-return
              next()
            } else {
          vm.$router.push('/login')
            }
          })
        })
      }
  }
</script>

<style lang="css" scoped>
  
</style>