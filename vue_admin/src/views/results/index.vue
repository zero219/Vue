<template>
  <div>
    <el-result icon="warning" title="警告提示" subTitle="抱歉,您暂时没有权限">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="returnHandle"
          >返回</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    returnHandle() {
      this.$router.push('/Home')
    },
  },
}
</script>
