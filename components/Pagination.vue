<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="items.length"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="updatePage"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    items: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages(): number {
      return Math.ceil(this.items.length / this.pageSize)
    },
  },
  methods: {
    updatePage(pageNumber: number): void {
      this.$emit('page:update', pageNumber)
    },
  },
})
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 20px;
}

.pagination-button {
  border: 1px solid #3b5998;
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #1c1d21;
  background-color: #fff;
}

.active {
  background-color: #1da1f2;
}
</style>