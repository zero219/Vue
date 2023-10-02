<template>
  <div>
    <el-result icon="warning" title="警告提示" :subTitle="msg">
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
    return {
      msg: '抱歉,暂时出错了！！！',
    }
  },
  created() {
    this.msg = this.$route.params.msg
  },
  methods: {
    returnHandle() {
      this.$router.push('/Home')
    },
  },
}
</script>
