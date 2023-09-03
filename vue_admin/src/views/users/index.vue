<template>
  <div>
    <!-- 面包屑导航区域 -->
    <my-data-breadcrumb :crumbData="crumbData"></my-data-breadcrumb>
    <!-- 查询条件 -->
    <my-query-panel
      :queryForm="queryForm"
      @queryFilter="queryFilter"
    ></my-query-panel>
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
        :menuWidth="260"
      >
        <template slot="menu" slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row, scope.index)"
            >编辑</el-button
          >
          <el-button size="mini" @click="assigningRoles(scope.row, scope.index)"
            >分配角色</el-button
          >
          <el-button
            size="mini"
            @click="assignPermissions(scope.row, scope.index)"
            >分配权限</el-button
          >
        </template>
      </my-data-table>
    </my-query-result>
    <my-data-modal ref="addDataModal" title="添加用户" size="md">
      <template slot="body"><h1>内容</h1> </template>
    </my-data-modal>
    <my-confirm-modal ref="exportConfirmModal"></my-confirm-modal>
  </div>
</template>

<script>
import {
  MyDataBreadcrumb,
  MyQueryPanel,
  MyQueryResult,
  MyDataTable,
  MyDataModal,
  MyConfirmModal,
} from '../../components'
export default {
  components: {
    MyDataBreadcrumb,
    MyQueryPanel,
    MyQueryResult,
    MyDataTable,
    MyDataModal,
    MyConfirmModal,
  },
  data() {
    return {
      // 面包屑
      crumbData: {
        toPath: '/Home',
        toPathName: '首页',
        menuParent: '用户管理',
        menuVal: '用户列表',
      },
      // 查询条件
      queryForm: {
        conditions: [
          {
            type: 'input',
            label: '名称',
            userName: '',
          },
        ],
      },
      searchFilter: [],
      tableTitle: '用户列表',
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
        { prop: 'userName', label: '名称', minWidth: '100px' },
        { prop: 'email', label: '邮箱', minWidth: '100px' },
      ],
      dataList: [],
      pager: {
        total: 10,
        current: 1,
        size: 10,
      },
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 子组件传值
    queryFilter(val) {
      this.searchFilter = val
    },
    async getDataList() {
      this.dataList = []
      const _params = {
        userName: this.searchFilter[0]?.userName || null,
      }
      const res = await this.$http.get(this.api.users, { params: _params })
      if (res.status === 200) {
        this.dataList = res.data
        this.pager.total = res.data.length
      }
    },
    addFun() {
      this.$refs.addDataModal.show()
    },
    exportFun() {
      this.$refs.exportConfirmModal.modal('导出', '确认导出吗？')
    },
    // 编辑按钮
    handleEdit(index, row) {
      console.log(index, row)
    },
    // 分配角色
    assigningRoles(index, row) {
      console.log(index, row)
    },
    // 分配权限
    assignPermissions(index, row) {
      console.log(index, row)
    },
  },
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>
