<template>
  <div>
    <div class="filter-block">
      <el-dropdown :hide-on-click="false" placement="bottom" trigger="click">
        <span class="el-dropdown-link">
          Сортировка<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus" @click.native="sortByDate"
            >По дате</el-dropdown-item
          >
          <el-dropdown-item
            icon="el-icon-circle-plus"
            @click.native="sortMatchWords"
            >Совпадению слов</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    sortByDate(): void {
      if (this.$store.state.sortByDate === false) {
        this.$store.commit('sortByLow')
      } else {
        this.$store.commit('sortByHigh')
      }
    },
    sortMatchWords(): void {
      this.$message({
        showClose: true,
        message:
          'Я не понял из тз, что нужно сделать и что нужно отсортировать.',
        type: 'error',
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.filter-block {
  padding: 15px;
  text-align: center;
  background-color: #f3f3f3;
}
</style>
