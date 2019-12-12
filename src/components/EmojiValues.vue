<template>
  <span @click="choose" class="pointer">{{ emoji.value }}</span>
</template>

<script>
  export default {
    name: 'emoji-values',
    props: {
      emoji: {
        type: Object,
        default: null
      }
    },
    methods: {
      choose () {
        this.$emit('click', this.emoji)
      }
    },
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
