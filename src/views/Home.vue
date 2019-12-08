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
          vuejs-vuetify-chat app
        </h5>
      </v-flex>
      
      <!-- the actual app here -->
      <v-flex
        mb-5
        xs12
      >
        <v-layout justify-center>
          <v-layout row>
            <v-flex xs12 sm10 order-xs2 style="position: relative;">
              <div class="chat-container" ref="chatContainer" >
                <!-- <message :messages="messages"></message> -->
              </div>
              <!-- <emoji-picker :show="emojiPanel"></emoji-picker> -->
              <div class="typer">
                <input
                  type="text"
                  placeholder="Type here..."
                  v-on:keyup.enter="saveMsg"
                  v-model="message"
                  style="border: 1px solid red; width:100%; padding: 10px;"
                >
                <Emoticons @click="addit" />
              </div>
            </v-flex>
            <v-flex
              id="scroll-target"
              sm12
              order-xs1
              style="max-height: 400px"
              class="overflow-y-auto"
              v-chat-scroll="{always: false, smooth: true, scrollonremoved:true}"
            >

              <!-- <chats></chats> -->
                <v-list
                  subheader
                  two-line
                  align="center"
                  justify="center"
                  style="min-height: 400px"
                  avatar
                >
                  <v-subheader>Recent</v-subheader>
                  <v-list-item-group>
                    <v-list-item 
                      v-for="(message, index) in messages"
                      :key="index"
                      :class="[message.author === authUser.displayName ? 'text-right' : 'text-left']"
                    >

                      <v-list-item-content>
                        <v-list-item-title>
                          <v-chip pill>
                            <v-avatar left color="red" v-if="message.author !== authUser.displayName">P</v-avatar>
                            {{ message.message }}
                            <v-avatar right color="red" v-if="message.author === authUser.displayName">M</v-avatar>
                          </v-chip>
                        </v-list-item-title>
                        <v-list-item-subtitle>{{ message.author }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon>mdi-chat_bubble</v-icon>
                      </v-list-item-action>
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
import firebase from 'firebase'
import { db } from '../main'
import Emoticons from '@/components/Emotions'

// import moment from 'moment'

// @ is an alias to /src
export default {
  name: 'home',
  components: {
    Emoticons
  },
  data: () => ({
    messages: [],
		users: [],
		message: '',
		isActive: false,
    authUser:{},
  }),
  methods: {
    addit (emoji) {
      console.log(emoji.value)
      this.message += emoji.value.toString()
    },
    saveMsg() {
      console.log(this.authUser.displayName)
      // save to fs
      db.collection('chat').add({
        message: this.message,
        author: this.authUser.displayName,
        createdAt: new Date()
      })
      this.message = ''
    },
    fetchMsg() {
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
  },
  created () {
    let user = firebase.auth().currentUser
    if (user) {
      this.authUser = user
      const allUsers = []
      allUsers.push(user)
      this.users = allUsers
      console.log(this.users)
      } else {
      this.authUser = {}
      }
      this.fetchMsg()
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
    box-sizing: border-box;
    display: flex;
    align-items: center;
    bottom: 0;
    height: 4.9rem;
    width: 100%;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 10px;
  }
</style>