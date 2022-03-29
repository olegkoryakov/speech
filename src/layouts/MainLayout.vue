<template>
  <div class="main-lyaout">
    <h1>speech app</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class FindWordApp extends Vue {
  mounted(): void {
    const isCordova = !!window.cordova;
    if (isCordova) {
      this.$router.push('/app'); // eslint-disable-line
    }
  }
}
</script>
