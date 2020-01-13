<template>
  <v-container
    id="scroll-target"
    ref="chat"
    sm9
    order-xs1
    style="max-height: 400px"
    class="overflow-y-auto"
  >
    <!-- v-chat-scroll="{ always: false, smooth: true, scrollonremoved: true }" -->

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
                  <span v-html="message.message" class="mt-2">
                     <!-- {{ message.message }} -->
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

<script lang="ts">
// import moment from 'moment'
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'Messages',
  })
  export default class Messages extends Vue {
    @Prop({ type: Array, required: true }) public readonly messages!: object;
    @Prop({ type: Object, required: true }) public readonly authUser!: object;

    // activeMessage: false,
    public lastMessage: object = {}
    public messageRecieved: boolean = false

    public definer() {
      // this.lastMessage = this.messages[this.messages.length - 1]
      // console.log(moment(this.lastMessage.createdAt.seconds).format('LTS'))
      console.log('this is hi from messages component!');
    }

    public scrollToEnd() {
      this.$nextTick(() => {
        const container: any = this.$refs.chat
        container.scrollTop = container.scrollHeight
        console.log(container.scrollTop, container.scrollHeight)
      })
    }

    public created() {
      this.definer();
      this.scrollToEnd();
    }
  }
</script>

<style lang="scss" scoped>

</style>