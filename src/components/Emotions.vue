<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="230"
      left
      top
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon class="blue--text emoji-panel">
          <v-icon>mdi-emoticon</v-icon>
        </v-btn>
      </template>

      <v-card>
        Emoticons
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
            <!-- component emojiValues -->
            <EmojiValues
              @click="choose"
              v-for="(emoji, index) in emojis"
              :key="index"
              :emoji="emoji"
            />
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
      menu: false, // turning on/off the emotions menu
      emojis: []
    }),
    methods: {
      choose (emoji) {
        this.$emit('click', emoji)
        // console.log(emoji)
      }
    },
    created () {
      axios.get('https://raw.githubusercontent.com/shanraisshan/EmojiCodeSheet/master/json/string/People.json')
        .then((res) => {
          this.emojis = res.data.peoples.people
        })
        .catch(() => {})
    }
  }
</script>
