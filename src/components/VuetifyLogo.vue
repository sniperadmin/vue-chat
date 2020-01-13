<template>
  <v-img
    :src="require('../assets/logo.svg')"
    class="my-3"
    contain
    :height="height"
  ></v-img>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'VuetifyLogo',
  })

export default class VuetifyLogo extends Vue {
  @Prop({ type: String, default: '50' }) public readonly height!: string;
}
</script>

<style scoped>

</style>