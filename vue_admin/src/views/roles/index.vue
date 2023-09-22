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
        :menuWidth="170"
      >
        <template slot="menu" slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="confirmDataItem({ action: 'del', id: scope.row.id })"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="assignClaims(scope.row.id)"
            >分配权限</el-button
          >
        </template>
      </my-data-table>
    </my-query-result>
    <!-- 添加角色弹窗 -->
    <my-data-modal
      ref="saveDataModal"
      :title="modalTitle"
      size="sm"
      @ok="saveRole('roleForm')"
      @reset="resetForm('roleForm')"
    >
      <template slot="body">
        <el-form
          ref="roleForm"
          :model="roleForm"
          :rules="roleRules"
          label-width="80px"
        >
          <el-form-item label="角色名" prop="roleName">
            <el-input
              placeholder="请输入角色名"
              v-model="roleForm.roleName"
            ></el-input>
          </el-form-item>
          <el-form-item label="正式名称" prop="normalizedName">
            <el-input
              placeholder="请输入正式名称"
              v-model="roleForm.normalizedName"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
    </my-data-modal>
    <!-- 确认弹窗 -->
    <my-confirm-modal
      ref="confirmModal"
      @confirm="confirmDataItem"
    ></my-confirm-modal>
    <!-- 分配权限 -->
    <my-data-modal ref="claimDataModal" title="权限" size="md" @ok="saveClaims">
      <template slot="body">
        <el-tree
          ref="treeClaims"
          :data="treeDataClaims"
          show-checkbox
          default-expand-all
          node-key="id"
        >
        </el-tree>
      </template>
    </my-data-modal>
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
        menuParent: '角色管理',
        menuVal: '角色列表',
      },
      // 查询条件
      queryForm: {
        conditions: [
          {
            type: 'input',
            label: '正式名称',
            roleName: '',
          },
        ],
      },
      searchFilter: [],
      tableTitle: '角色列表',
      tableHeaderButtons: [
        {
          setEventKey: 'company-add',
          type: 'primary',
          clickFunc: () => this.addFun(),
          buttonName: '添加',
        },
      ],
      options: [
        { prop: 'name', label: '角色名称', minWidth: '100px' },
        { prop: 'normalizedName', label: '正式名称', minWidth: '100px' },
      ],
      dataList: [],
      pager: {
        total: 10,
        current: 1,
        size: 10,
      },
      modalTitle: '',
      roleForm: {
        roleName: '',
        normalizedName: '',
      },
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
        ],
        normalizedName: [
          { required: true, message: '请输入正式名称', trigger: 'blur' },
        ],
      },
      treeDataClaims: [],
    }
  },
  created() {
    this.getDataList()
    this.getClaimList()
  },
  methods: {
    // 子组件传值
    queryFilter(val) {
      this.searchFilter = val
    },
    getDataList() {
      this.dataList = []
      const _params = {
        roleName: this.searchFilter[0]?.roleName || null,
      }
      this.$http.get(this.api.roles, { params: _params }).then((res) => {
        if (res.status === 200) {
          this.dataList = res.data
          this.pager.total = res.data.length
        }
      })
    },
    // 添加
    addFun() {
      this.modalTitle = '添加角色'
      this.$refs.saveDataModal.show()
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 保存
    saveRole(formName) {
      // 添加
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _params = {
            roleName: this.roleForm.roleName,
            normalizedName: this.roleForm.normalizedName,
          }
          this.$http.post(this.api.roles, _params).then((res) => {
            if (res.status === 201) {
              this.$refs.saveDataModal.hide()
              this.$message.success('操作成功')
              this.getDataList()
            }
          })
        } else {
          return false
        }
      })
    },
    // 弹窗
    confirmDataItem(item) {
      const modal = this.$refs.confirmModal
      const action = item ? item.action : this.confirmItem.action
      if (item) {
        this.confirmItem = item
      }
      this[`${action}Confirm`](modal, item)
    },
    delConfirm(modal, item) {
      if (item) {
        modal.modal('删除', '确认删除吗？')
      } else {
        modal && modal.hide()
        this.$http
          .delete(this.api.rolesId.replace('{roleId}', this.confirmItem.id))
          .then((res) => {
            if (res.status === 204) {
              this.getDataList()
              this.$message.success('操作成功')
            }
          })
      }
    },
    // 加载权限
    getClaimList() {
      this.treeDataClaims = []
      this.$http.get(this.api.claimsTree).then((res) => {
        if (res.status === 200) {
          this.treeDataClaims = res.data
        }
      })
    },
    // 分配权限
    assignClaims(index) {
      this.roleClaimsId = index
      this.$refs.claimDataModal.show()
      this.$http
        .get(this.api.roleClaims.replace('{roleId}', index))
        .then((res) => {
          this.$refs.treeClaims.setCheckedNodes(res.data)
        })
    },
    // 保存权限
    saveClaims() {
      const claimsNodes = this.$refs.treeClaims.getCheckedNodes(true, false)
      const params = {
        claims: claimsNodes,
      }
      this.$http
        .post(
          this.api.roleClaims.replace('{roleId}', this.roleClaimsId),
          params
        )
        .then((res) => {
          if (res.status === 201) {
            this.$message.success('操作成功')
            this.$refs.claimDataModal.hide()
          }
        })
    },
  },
}
</script>

<style lang="less" scoped></style>
