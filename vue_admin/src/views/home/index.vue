<template>
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img
          src="../../assets/logo.png"
          alt=""
          style="width: 60px; height: 60px"
        />
        <span style="color: '#545c64'">后台管理系统</span>
      </div>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i class="el-icon-menu"></i>
        </div>
        <el-menu
          class="el-menu-vertical"
          background-color="#fff"
          text-color="#545c64"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          router
          :default-active="activePath"
        >
          <el-submenu
            :index="menu.id.toString()"
            v-for="menu in menuList"
            :key="menu.id"
          >
            <template slot="title">
              <i :class="iconsList[menu.id]"></i>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.path"
                v-for="item in menu.children"
                :key="item.id"
              >
                <template slot="title">
                  <i :class="iconsList[menu.id]"></i>
                  <span>{{ item.name }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容栏 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconsList: {
        1: 'el-icon-s-custom',
        2: 'el-icon-s-claim',
        3: 'el-icon-s-platform',
      },
      isCollapse: false,
      activePath: '0',
    }
  },
  created() {
    this.activePath = this.$route.path
    this.getMenuList()
  },
  mounted() {},
  methods: {
    async getMenuList() {
      const res = await this.$http.get(this.api.menuList)
      if (res.status !== 200) {
        this.$router.push('/Login')
      }
      this.menuList = res.data
    },
    // 登出
    logout() {
      localStorage.clear()
      this.$router.push('/Login')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style lang="less" scoped>
.index-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #303133;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #fff;
  // 菜单栏右边有边框
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}

// 退出按钮
.toggle-button {
  background-color: #eaedf1;
  font-size: 10px;
  line-height: 24px;
  color: #111111;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
