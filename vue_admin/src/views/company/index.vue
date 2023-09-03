<template>
  <div>
    <!-- 面包屑导航区域 -->
    <my-data-breadcrumb :crumbData="crumbData"></my-data-breadcrumb>
    <!-- 查询条件 -->
    <my-query-panel :queryForm="queryForm"></my-query-panel>
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
import {
  MyDataBreadcrumb,
  MyQueryPanel,
  MyQueryResult,
  MyDataTable,
} from '../../components'
export default {
  name: 'company',
  components: {
    MyDataBreadcrumb,
    MyQueryPanel,
    MyQueryResult,
    MyDataTable,
  },
  data() {
    return {
      // 面包屑
      crumbData: {
        toPath: '/Home',
        toPathName: '首页',
        menuParent: '公司管理',
        menuVal: '公司列表',
      },
      // 查询条件
      queryForm: {
        conditions: [
          {
            type: 'input',
            label: '文本条件',
            value: '',
          },
          {
            type: 'select',
            label: '下拉框',
            value: '',
            options: [
              {
                value: '选项1',
                label: '黄金糕',
              },
              {
                value: '选项2',
                label: '双皮奶',
              },
              {
                value: '选项3',
                label: '蚵仔煎',
              },
              {
                value: '选项4',
                label: '龙须面',
              },
              {
                value: '选项5',
                label: '北京烤鸭',
              },
            ],
          },
        ],
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
