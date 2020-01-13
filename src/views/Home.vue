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
      <v-flex xs12>
        <!-- <Notify /> -->
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

<script lang="ts">
  import { firebase, db } from '../fb';
  import VuetifyLogo from '@/components/VuetifyLogo';
  import ProfileMenu from '@/components/ProfileMenu';
  import Hero from '@/components/Hero';
  import Guides from '@/components/Guides';
  import Typer from '@/components/Typer';
  import Users from '@/components/Users';
  import Messages from '@/components/Messages';
  import Logout from '@/components/Logout';
  // import Notify from '@/components/PushNotification';
  import Vue from 'vue';
  import Component from 'vue-class-component';


  const firestoreDb = firebase.firestore();
  const oldRealTimeDb = firebase.database();

  const usersRef = firestoreDb.collection('profiles'); // Get a firestore reference to the Users collection
  const onlineRef = oldRealTimeDb.ref('.info/connected'); // Get a database reference to the list of connections


  interface User {
    uid: string
    liveStatus: string
    photoURL: string
  }

  // The @Component decorator indicates the class is a Vue component
  @Component({
  name: 'home',
  components: {
      VuetifyLogo,
      ProfileMenu,
      Hero,
      Guides,
      Typer,
      Users,
      Messages,
      Logout,
      // Notify,
    },
})

export default class Home extends Vue {
  public messages: object[] = [];
  public currentUser: object = {};
  public users: object[] = [];
  public isActive: string = '';
  public profileImg: string = 'https://lh5.googleusercontent.com/-U1TFOGH-4DQ/AAAAAAAAAAI/AAAAAAAAAuE/tS4M30mPvU8/photo.jpg';
  public authUser: object = {};
  public loading: boolean = false;
  public snackbar: boolean = false;
  public appOn: boolean = false;
  public notifications: string[] = ['logged In!', 'App Online!', 'App Offline'];

  public runCashingUser(user: User): void {
    if (user) {
      onlineRef.on('value', (snapshot: any) => {
        if (snapshot.val() === true) { // if vlaue is true
          // console.log(user)
          this.appOn = true;
          this.snackbar = true;
          usersRef.doc(user.uid).update({
            liveStatus: 'online',
          });
        } else {
          this.appOn = false;
        }
      });
      // setting active status
      this.isActive = user.liveStatus;
      // injecting user object
      this.authUser = user;
      // injecting photo
      this.profileImg = user.photoURL;
      // cashing user
      const allUsers = [];
      allUsers.push(user);
      this.currentUser = allUsers;
      } else {
        this.authUser = {};
      }
  }

  public fetchMsg() {
    db.collection('chat').orderBy('createdAt').onSnapshot((querySnapShot: any) => {
      // create caching
      const allMsgs: object[] = []
      // cash docs
      querySnapShot.forEach((doc: any) => {
          allMsgs.push(doc.data())
      })
      // inject cashed messages into props
      this.messages = allMsgs
      window.localStorage.setItem('messages', JSON.stringify(this.messages))
    })
  }

  public fetchUsers() {
    this.loading = true
    db.collection('profiles').onSnapshot((querySnapShot: any) => {
      // create caching
      const allUsers: object[] = []
      // cash docs
      querySnapShot.forEach((doc: any) => {
        allUsers.push(doc.data())
      })
      // inject cashed messages into props
      this.users = allUsers
      })
    this.loading = false
    }

  public logout() {
    // console.log('logout')
    const user: any = firebase.auth().currentUser
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      // updating liveStatus in firestore
      window.localStorage.setItem('user', JSON.stringify({}))
      usersRef.doc(user.uid).update({
          liveStatus: 'offline',
        })
    }).catch(() => {
      // An error happened.
    })
  }

  public beforeRouteEnter(to: any, from: any, next: any) {
      next((vm: any) => {
        firebase.auth().onAuthStateChanged((user: any) => {
          if (user) {
            // eslint-disable-next-line callback-return
            next()
          } else {
            vm.$router.push('/login')
          }
        })
      })
    }

  public created() {
    // firebase.auth().onAuthStateChanged(this.runCashingUser)
    this.fetchMsg()
    this.fetchUsers()
  }

}
</script>

<style lang="css" scoped>
  
</style>