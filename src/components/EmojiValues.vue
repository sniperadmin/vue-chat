<template>
  <span @click="choose" class="pointer">{{ emoji.value }}</span>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component({
    name: 'emoji-values',
  })

  export default class EmojiValues extends Vue {
    @Prop({ type: Object, required: true }) public readonly emoji!: object;

      public choose() {
        this.$emit('click', this.emoji);
      }

      get clickedEmoji() {
        return this.emoji;
      }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>