<template>
  <div>
    <el-card class="my-query-panel">
      <!-- 查询条件表单 -->
      <el-form
        ref="queryForm"
        :model="queryForm"
        :inline="true"
        label-width="80px"
      >
        <el-form-item
          v-for="(condition, index) in queryForm.conditions"
          :key="index"
          :label="condition.label"
        >
          <el-input
            v-if="condition.type === 'input'"
            v-model="condition[Object.keys(condition)[2]]"
          ></el-input>
          <el-select
            v-else-if="condition.type === 'select'"
            v-model="condition[Object.keys(condition)[2]]"
            :placeholder="`请选择${condition.label}`"
          >
            <el-option
              v-for="item in condition.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-date-picker
            v-else-if="condition.type === 'date'"
            v-model="condition[Object.keys(condition)[2]]"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="reset">重置</el-button>
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
      conditions: {
        type: Array,
        default: () => {
          return [
            {
              type: 'text',
              label: '文本条件',
              value: '',
            },
          ]
        },
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    onSubmit() {
      // 通过 this.$parent 访问父组件实例并调用父组件方法
      this.$parent.getDataList()
      // console.log('子组件', this.queryForm.conditions)
      this.$emit('queryFilter', this.queryForm.conditions)
    },
    reset() {
      // 重置所有条件输入框
      this.queryForm.conditions.forEach((condition) => {
        console.log(condition)
        condition[Object.keys(condition)[2]] = ''
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
