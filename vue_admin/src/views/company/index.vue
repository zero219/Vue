<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公司管理</el-breadcrumb-item>
      <el-breadcrumb-item>公司列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 查询条件 -->
    <my-query-panel :queryForm="queryForm">
      <el-form-item label="审批人" prop="person">
        <el-input v-model="queryForm.person" placeholder="审批人"></el-input>
      </el-form-item>
    </my-query-panel>
    <!-- 表格列表 -->
    <my-query-result>
      <my-data-table
        :tableTitle="tableTitle"
        :tableHeaderButtons="tableHeaderButtons"
        :checkbox="true"
        :isIndex="true"
        :options="options"
        :data="dataList"
        :pager="pager"
      >
        <template slot="menu" slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row, scope.index)"
            >编辑</el-button
          >
          <el-button size="mini" @click="handlDel(scope.row, scope.index)"
            >删除</el-button
          >
        </template>
      </my-data-table>
    </my-query-result>
  </div>
</template>

<script>
import { MyQueryPanel, MyQueryResult, MyDataTable } from '../../components'
export default {
  name: 'company',
  components: {
    MyQueryPanel,
    MyQueryResult,
    MyDataTable,
  },
  data() {
    return {
      queryEvent: 'company-change',
      queryForm: {
        person: '',
      },
      tableTitle: '公司列表',
      tableHeaderButtons: [
        {
          setEventKey: 'company-add',
          type: 'primary',
          clickFunc: () => this.addFun(),
          buttonName: '添加',
        },
        {
          setEventKey: 'company-add',
          type: 'primary',
          clickFunc: () => this.exportFun(),
          buttonName: '导出',
        },
      ],
      options: [
        { prop: 'name', label: '名称', minWidth: '100px' },
        { prop: 'sex', label: '性别', minWidth: '100px' },
      ],
      dataList: [
        { name: 'zzc', sex: '男' },
        { name: 'zzc1', sex: '男' },
        { name: 'zzc', sex: '男' },
        { name: 'zzc1', sex: '男' },
      ],
      pager: {
        total: 100,
        current: 1,
        size: 10,
      },
    }
  },
  computed: {},
  methods: {
    getDataList() {
      console.log('getDataList')
    },
    addFun() {
      console.log(111)
    },
    exportFun() {},
    handleEdit(index, row) {
      console.log(index, row)
    },
    handlDel(index, row) {
      console.log(index, row)
    },
  },
}
</script>

<style></style>
