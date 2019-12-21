<template>
  <v-container
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
          <!-- <v-scroll-y-transition>
            <div v-if="active">
              Active
            </div>
          </v-scroll-y-transition> -->

            <v-list-item-content>
              <v-list-item-title>
                <v-chip pill>
                  <v-avatar
                    left
                    :color="authUser.liveStatus === 'online' ? 'green' : 'grey'" v-if="message.email !== authUser.email"
                  >
                  <!-- {{ message.author.slice(0, 1) }} -->
                  ?
                  </v-avatar>
                  <span>
                     {{ message.message }}
                  </span>
                  <v-avatar right :color="authUser.liveStatus === 'offline' ? 'green' : 'grey'" v-if="message.email === authUser.email">
                    <!-- {{ message.author.slice(0, 1) }} -->
                    Me
                  </v-avatar>
                </v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>{{ message.author }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      </v-list-item-group>
      </v-list>
  </v-container>
</template>

<script>
  export default {
    name: 'messages',
    props: {
      messages: {
        type: Array,
        default: null
      },
      authUser: {
        type: Object,
        default: null
      }
    },
    data: () => ({
      // activeMessage: false,
    }),
    methods: {
      // toggleMessageOptions (x) {
      //   console.log(x)
      //   this.activeMessage = !this.activeMessage
      // }
    },
  }
</script>

<style lang="scss" scoped>

</style>