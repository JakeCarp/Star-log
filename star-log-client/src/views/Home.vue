<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Log v-if="!showContent" />
    <targetLog v-if="showContent" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Log from '@/components/Log.vue'

  export default {
    name: 'home',
    components: {
      Log
    }
  }
</script>