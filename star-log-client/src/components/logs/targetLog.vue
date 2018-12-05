<template>
  <div class=log>
    <div class="card-content">
      <p>{{log.desription}}</p>

    </div>

    <div id="comments">
      {{log.comments}}
    </div>




  </div>
</template>

<script>
  import Log from "./Log.vue";
  export default {
    data() {

    }
  }



</script>