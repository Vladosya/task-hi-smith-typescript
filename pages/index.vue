<template>
  <div class="container">
    <Home />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Home from '../components/Home.vue'

export default Vue.extend({
  components: {
    Home,
  },
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  max-width: 100%;
}
</style>