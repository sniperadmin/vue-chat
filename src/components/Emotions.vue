<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon class="blue--text emoji-panel">
          <v-icon>mdi-emoticon</v-icon>
        </v-btn>
      </template>

      <v-card>
          <p>Emoticons</p>
        <v-container
          fluid
          id="scroll-target"
          style="max-height: 100px; width: 250px;"
          class="overflow-y-auto"
        >
          <v-row
            align="start"
            justify="center"
            style="height: 100px"
          >
          <div>
            <EmojiValues @click="choose" v-for="(emoji, index) in emojis" :key="index" :emoji="emoji" />
          </div>
          </v-row>
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  import EmojiValues from '@/components/EmojiValues.vue';
  import axios from 'axios'

  export default {
    components: {
      EmojiValues
    },
    props: {
      emoji: {
        type: String,
        default: null
      }
    },
    data: () => ({
      menu: true,
      emojis: []
    }),
    methods: {
      choose (emoji) {
        this.$emit('click', emoji)
      }
    },
    created () {
      axios.get('https://raw.githubusercontent.com/shanraisshan/EmojiCodeSheet/master/json/string/People.json')
        .then((res) => {
          console.log(res.data.peoples.people)
          this.emojis = res.data.peoples.people
        })
        .catch(() => console.log('error'))
    }
  }
</script>
