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
        :menuWidth="320"
      >
        <template slot="menu" slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row, scope.index)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="confirmDataItem({ action: 'del', id: scope.row.id })"
            >删除</el-button
          >
          <el-button
            type="info"
            size="mini"
            @click="assigningRoles(scope.row.id)"
            >分配角色</el-button
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
    <!-- 添加编辑用户 -->
    <my-data-modal
      ref="saveDataModal"
      :title="modalTitle"
      size="md"
      @ok="saveUser('userForm')"
      @reset="resetForm('userForm')"
    >
      <template slot="body">
        <el-form
          ref="userForm"
          :model="userForm"
          :rules="userRules"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="uName">
            <el-input
              placeholder="请输入用户名"
              v-model="userForm.uName"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              placeholder="请输入邮箱"
              v-model="userForm.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input
              placeholder="请输入手机"
              v-model="userForm.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" v-if="isPwd">
            <el-input
              placeholder="请输入密码"
              v-model="userForm.pwd"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
    </my-data-modal>
    <my-confirm-modal
      ref="confirmModal"
      @confirm="confirmDataItem"
    ></my-confirm-modal>
    <!-- 分配角色 -->
    <my-data-modal
      ref="rolesDataModal"
      title="角色"
      size="md"
      @ok="saveUser('userForm')"
      @reset="resetForm('userForm')"
    >
      <template slot="body">
        <el-tree
          :data="treeDataRoles"
          @check-change="assigningRolesChange"
          show-checkbox
          default-expand-all
        >
        </el-tree>
      </template>
    </my-data-modal>
    <!-- 分配权限 -->
    <my-data-modal
      ref="claimDataModal"
      title="权限"
      size="md"
      @ok="saveUser('userForm')"
      @reset="resetForm('userForm')"
    >
      <template slot="body">
        <el-tree
          :data="treeDataClaims"
          @check-change="assignClaimsChange"
          show-checkbox
          default-expand-all
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
          clickFunc: () => this.confirmDataItem({ action: 'exportFun' }),
          buttonName: '导出',
        },
      ],
      options: [
        { prop: 'userName', label: '名称', minWidth: '100px' },
        { prop: 'email', label: '邮箱', minWidth: '100px' },
        { prop: 'phoneNumber', label: '手机', minWidth: '100px' },
      ],
      dataList: [],
      pager: {
        total: 10,
        current: 1,
        size: 10,
      },
      confirmItem: {},
      modalTitle: '添加用户',
      userForm: {
        uId: '',
        uName: '',
        email: '',
        phone: '',
        pwd: '',
      },
      userRules: {
        uName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
        phone: [{ required: true, message: '请输入手机', trigger: 'blur' }],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在至少6个字符', trigger: 'blur' },
        ],
      },
      isPwd: true,
      treeDataRoles: [],
      treeDataClaims: [],
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 1,
              label: '一级 1-1',
            },
            {
              id: 2,
              label: '一级 1-2',
            },
          ],
        },
        {
          id: 2,
          label: '二级 1',
          children: [
            {
              id: 1,
              label: '二级 2-1',
            },
            {
              id: 2,
              label: '二级 2-2',
            },
          ],
        },
      ],
    }
  },
  created() {
    this.getDataList()
    this.getRolesList()
    this.getClaimList()
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
    // 弹窗
    confirmDataItem(item) {
      const modal = this.$refs.confirmModal
      const action = item ? item.action : this.confirmItem.action
      if (item) {
        this.confirmItem = item
      }
      this[`${action}Confirm`](modal, item)
    },
    // 添加用户
    addFun() {
      this.modalTitle = '添加用户'
      this.isPwd = true
      this.$refs.saveDataModal.show()
      this.userForm.uId = ''
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 保存
    saveUser(formName) {
      const _params = {
        userName: this.userForm.uName,
        email: this.userForm.email,
        phoneNum: this.userForm.phone,
      }
      const refs = this.$refs[formName]
      // 清除之前的验证信息
      refs.clearValidate()
      if (this.userForm.uId === '' || this.userForm.uId === null) {
        refs.validate((valid) => {
          // 添加
          if (valid) {
            _params.passWord = this.userForm.pwd
            this.$http.post(this.api.user, _params).then((res) => {
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
      } else {
        // 需要验证的字段
        const fieldsToValidate = ['uName', 'email', 'phone']
        const arr = []
        refs.validateField(fieldsToValidate, (error) => {
          if (error) {
            arr.push(0)
          } else {
            arr.push(1)
          }
        })
        if (!arr.includes(0)) {
          _params.userId = this.userForm.uId
          // 修改
          this.$http.put(this.api.user, _params).then((res) => {
            if (res.status === 201) {
              this.$refs.saveDataModal.hide()
              this.$message.success('操作成功')
              this.getDataList()
            }
          })
        }
      }
    },
    // 导出
    exportFunConfirm(modal, item) {
      if (item) {
        modal.modal('导出', '确认导出吗？')
      } else {
        modal && modal.hide()
      }
    },
    // 编辑按钮
    handleEdit(row, index) {
      this.modalTitle = '编辑用户'
      this.isPwd = false
      this.userForm.uId = row.id
      this.userForm.uName = row.userName
      this.userForm.email = row.email
      this.userForm.phone = row.phoneNumber
      this.$refs.saveDataModal.show()
    },
    // 删除
    delConfirm(modal, item) {
      if (item) {
        modal.modal('删除', '确认删除吗？')
      } else {
        modal && modal.hide()
        this.$http
          .delete(this.api.users + '/' + this.confirmItem.id)
          .then((res) => {
            if (res.status === 204) {
              this.$message.success('操作成功')
            }
          })
      }
    },
    // 加载角色
    getRolesList() {
      this.$http.get(this.api.rolesTree).then((res) => {
        if (res.status === 200) {
          this.treeDataRoles = res.data
        }
      })
    },
    // 分配角色
    assigningRoles(index) {
      this.$refs.rolesDataModal.show()
    },
    assigningRolesChange(data, checked, indeterminate) {},
    // 加载权限
    getClaimList() {
      this.$http.get(this.api.claimsTree).then((res) => {
        if (res.status === 200) {
          this.treeDataClaims = res.data
        }
      })
    },
    // 分配权限
    assignClaims(index) {
      this.$refs.claimDataModal.show()
    },
    assignClaimsChange(data, checked, indeterminate) {},
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
