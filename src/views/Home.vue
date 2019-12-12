<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <Vuetify-logo></Vuetify-logo>

      <v-flex mb-4>
        <h5 class="display-1 font-weight-bold mb-3">
          vuejs-vuetify-chat app
        </h5>
        <div v-if="currentUser">
          <v-btn color="info">
            <v-icon>mdi-account</v-icon>
            profile
          </v-btn>
          <v-btn @click="logout" color="error">
            <v-icon>mdi-power</v-icon>
            logout
          </v-btn>
        </div>
      </v-flex>
      
      <!-- the actual app here -->
      <v-flex
        mb-5
        xs12
      >
        <v-layout justify-center>
          <v-layout row>
            <v-flex xs12 order-xs2 style="position: relative;">
              
              <!-- typer -->
              <div class="typer">
                <input
                  type="text"
                  placeholder="Type here..."
                  v-on:keyup.enter="saveMsg"
                  v-model="message"
                >
                <!-- emotions panel -->
                <Emoticons @click="addit" />
                <!-- send btn -->
                <v-btn @click="saveMsg" icon teal class="blue--text" :disabled="!message">
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </div><!-- ./typer -->
            </v-flex>

            <!-- chat window -->  
            <v-flex xs3 color="grey">
              <v-card tile flat color="blue-grey darken-2" :loading="loading">
                All users ({{ users.length }})
              </v-card>
            </v-flex>
            <v-flex xs9>
              <v-card tile flat color="blue-grey darken-2" :loading="loading">
                Recent Chat
              </v-card>
            </v-flex>
            <v-flex xs3>
              <v-list
                subheader
                two-line
                align="center"
                justify="center"
                style="min-height: 400px"
                avatar
                color="indigo lighten-1"
              >

                <v-list-item dark v-for="user in users" :key="user.uid">
                  <v-list-item-avatar>
                    <v-img :src="user.photo" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ user.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ user.email }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon v-if="user.liveStatus === 'online'" color="green">mdi-account-circle</v-icon>
                    <v-icon v-else color="red">mdi-account</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-divider inset></v-divider>

              </v-list>
            </v-flex>
            <v-flex
              id="scroll-target"
              sm9
              order-xs1
              style="max-height: 400px"
              class="overflow-y-auto"
              v-chat-scroll="{ always: false, smooth: true, scrollonremoved: true }"
            >
              <v-list
                subheader
                two-line
                align="center"
                justify="center"
                style="min-height: 400px"
                avatar
              >
                <v-list-item-group>
                  <v-list-item 
                    v-for="(message, index) in messages"
                    :key="index"
                    :class="[message.email === authUser.email ? 'text-right' : 'text-left']"
                  >

                    <v-list-item-content>
                      <v-list-item-title>
                        <v-chip pill>
                          <v-avatar
                            left
                            :color="authUser.liveStatus === 'online' ? 'green' : 'grey'" v-if="message.email !== authUser.email"
                          >
                          {{ message.author.slice(0, 1) }}
                          </v-avatar>
                          {{ message.message }}
                          <v-avatar right :color="authUser.liveStatus === 'offline' ? 'green' : 'grey'" v-if="message.email === authUser.email">
                            {{ message.author.slice(0, 1) }}
                          </v-avatar>
                        </v-chip>
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ message.author }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-flex>

          </v-layout>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  // import firebase from 'firebase'
  import { firebase, db } from '../fb'
  import VuetifyLogo from '@/components/VuetifyLogo'
  import Emoticons from '@/components/Emotions'
  const firestoreDb = firebase.firestore();
  const oldRealTimeDb = firebase.database();

  const usersRef = firestoreDb.collection('profiles'); // Get a firestore reference to the Users collection;
  const onlineRef = oldRealTimeDb.ref('.info/connected'); // Get a database reference to the list of connections

  // import moment from 'moment'

  // @ is an alias to /src
  export default {
    name: 'home',
    components: {
      Emoticons,
      VuetifyLogo
    },
    data: () => ({
      messages: [],
      currentUser: [],
      message: '',
      users: [],
      isActive: '',
      authUser:{},
      profileImg:'https://lh5.googleusercontent.com/-U1TFOGH-4DQ/AAAAAAAAAAI/AAAAAAAAAuE/tS4M30mPvU8/photo.jpg',
      loading: false
    }),
    methods: {
      logout() {
        let user = firebase.auth().currentUser
        firebase.auth().signOut().then(() => {
          // Sign-out successful.

          usersRef.doc(user.uid).update({
              liveStatus: 'offline'
            })
        }).catch(() => {
          // An error happened.
        })
      },
      addit (emoji) {
        // console.log(emoji.value)
        this.message += emoji.value.toString()
      },
      saveMsg () {
        // save to fs
        if (this.message) {
          db.collection('chat').add({
            message: this.message.toString(),
            author: this.authUser.displayName,
            email: this.authUser.email,
            createdAt: new Date()
          })
          this.message = ''
        }
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
      }
    },
    created () {
      let user = firebase.auth().currentUser
      if (user) {
        onlineRef.on('value', (snapshot) => {
          if (snapshot.val() === true) { // if vlaue is true
            console.log('app connected!')
            usersRef.doc(user.uid).update({
              liveStatus: 'online'
            })
          } else {
            console.log('app disconnected!')
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
  .typer{
    align-items: center;
    background-color: #37474F;
    border: 1px solid black;
    border-radius: 10px;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    height: 4.9rem;
    padding: 10px;
    width: 100%;
  }
  .typer input {
    border: 1px solid grey;
    border-radius: 10px;
    height: 100%;
    padding: 20px;
    width:100%;
  }
</style>