<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: crumbData.toPath }">
      {{ crumbData.toPathName }}
    </el-breadcrumb-item>
    <el-breadcrumb-item>{{ crumbData.menuParent }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ crumbData.menuVal }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-data-breadcrumb',
  props: {
    crumbData: {
      typeof: Object,
      default: {
        toPath: '/Home',
        toPathName: '首页',
        menuParent: '',
        menuVal: '',
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style></style>
