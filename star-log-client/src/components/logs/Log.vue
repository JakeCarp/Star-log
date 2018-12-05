<template>
  <div>
    <h1>Captains Log</h1>
    <div v-for="log in logs">

      <div class="card">
        <div class="card-title">
          <h3>{{log.author}}</h3>
          <button @click="showContent = !showContent">Expand</button>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'log',
    data() {
      return {
        logs: [],
      }
    }
  }
  methods: {

  }

</script>

<style>


</style>