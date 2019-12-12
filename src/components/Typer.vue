<template>
  <v-flex xs12 order-xs2 style="position: relative;">
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
  </div>
  </v-flex>
</template>

<script>
  import { db } from '../fb'
  import Emoticons from '@/components/Emotions'

  export default {
    name: 'typer',
    props: {
      authUser: {
        type: Object,
        default: null
      }
    },
    components: {
      Emoticons
    },
    data: () => ({
      message: '',

    }),
    methods: {
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
    },
  }
</script>

<style scoped>
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