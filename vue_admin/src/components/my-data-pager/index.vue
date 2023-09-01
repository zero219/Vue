<template>
  <div class="my-data-pager" ref="pager" v-if="showPager">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      background
      :layout="layout"
      :hide-on-single-page="false"
      :total="totalCount"
      :current-page.sync="pageIndex"
      :page-sizes="pageSizes"
      :page-size="pageSize"
    />
  </div>
</template>

<script>
/**
 * 组件说明
 * 该组件为表格分页器
 *
 * **/
export default {
  name: 'my-data-pager',
  props: {
    pager: {
      // 当前页的信息
      type: Object,
      default() {
        return {}
      },
    },
    pageSizes: {
      // 一页显示条数选项
      type: Array,
      default() {
        return [10, 20, 50, 100]
      },
    },
    layout: {
      // 显示的内容配置
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
      // default: 'total, prev, pager, next, jumper'
    },
  },
  computed: {
    pageIndex: {
      get() {
        return this.pager.current || 1
      },
      set(val) {
        this.pager.current = val
      },
    },
    pageSize: {
      get() {
        return this.pager.size || 20
      },
      set(val) {
        this.pager.size = val
      },
    },
    totalCount() {
      return this.pager.total || 0
    },
    showPager() {
      return this.totalCount > this.pageSize
    },
    changeEvent() {
      return this.pager.event || 'pager-change'
    },
  },
  methods: {
    handleSizeChange(val) {
      this.pageIndex = 1
      this.pageSize = val
      this.$bus.$emit(this.changeEvent, {
        pageIndex: this.pageIndex,
        pageSize: val,
      })
    },
    handlePageChange(val) {
      this.$bus.$emit(this.changeEvent, {
        pageIndex: val,
        pageSize: this.pageSize,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.my-data-pager {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
