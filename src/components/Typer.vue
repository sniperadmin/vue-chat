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

<script lang="ts">
  import { db } from '../fb'
  import Emoticons from './Emotions';
  import { Vue, Component, Prop } from 'vue-property-decorator';

  // import moment from 'moment'

  interface AuthUser {
    message: string
    displayName: string
    email: string
    createdAt: string
  }

  @Component({
    name: 'Typer',
    components: {
      Emoticons,
    },
  })
  export default class Typer extends Vue {
    @Prop({ type: Object }) public authUser!: AuthUser;

    public message: string = ''

    public addit(emoji: any): any {
      this.message += emoji.value
    }

    public saveMsg() {
      // save to fs
      console.log(this.message)

      if (this.message) {
        db.collection('chat').add({
          message: this.message,
          author: this.authUser.displayName,
          email: this.authUser.email,
          createdAt: new Date(),
        })
        .then((ref: any) => {
          // console.log(ref)
          db.collection('chat').doc(ref.id).update({
            id: ref.id,
          })
          this.$emit('sent')
        })
        this.message = ''
      }
    }
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
    /* height: 4.9rem; */
    padding: 10px;
    width: 100%;
    color: aliceblue;
  }
  .typer input {
    border: 1px solid grey;
    border-radius: 10px;
    height: 100%;
    padding: 20px;
    width:100%;
  }
</style>