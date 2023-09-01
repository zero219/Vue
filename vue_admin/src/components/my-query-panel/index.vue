<template>
  <div>
    <el-card class="my-query-panel">
      <el-form
        ref="queryForm"
        :model="queryForm"
        label-width="80px"
        :inline="isInline"
      >
        <slot></slot>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
          <el-button @click="resetForm('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
/**
 * 组件说明
 * 该组件为全局统一的查询模块的组件，当搜索条件大于3个时，inline请用block换行模式
 * 具备重置以及查询功能
 * **/
export default {
  name: 'my-query-panel',
  props: {
    queryForm: {
      Object,
      default: {},
    },
    isInline: {
      Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    onQuery() {},
    resetForm(formName) {
      console.log(formName)
      // this.$refs.formName.resetFields()
    },
  },
}
</script>

<style lang="less" scoped></style>
