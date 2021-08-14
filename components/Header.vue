<template>
  <div class="header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type HeaderDataType = {
  title: string
}

export default Vue.extend({
  data(): HeaderDataType {
    return {
      title: this.$store.state.title as string,
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  background-color: #dcdcdc;

  h1 {
    padding: 30px;
    font-size: 30px;
  }
}
</style>