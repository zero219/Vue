<template>
  <my-data-modal
    ref="modal"
    :title="modalTitle"
    :loading="loading"
    width="550px"
    @ok="$emit('confirm')"
  >
    <p slot="body" class="modal-content">{{ modalMessage }}</p>
  </my-data-modal>
</template>

<script>
/**
 * 组件说明
 * 该组件为全局统一的简单弹窗提示组件， 例如删除类的二次弹窗
 * 可配置 提示标题，内容，确认取消按钮等
 * **/
import MyDataModal from '../my-data-modal'

export default {
  name: 'my-confirm-modal',
  props: {
    title: {
      // 弹窗标题
      type: String,
      default: '删除提示',
    },
    message: {
      // 弹窗内容
      type: String,
      default: '此操作将永久删除该数据, 是否继续?',
    },
    loading: {
      // 按钮loading效果
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modalTitle: this.title,
      modalMessage: this.message,
    }
  },
  methods: {
    modal(title, message) {
      if (title && message) {
        this.modalTitle = title
        this.modalMessage = message
      } else {
        this.modalTitle = this.title
        this.modalMessage = this.message
      }
      this.$refs.modal.show()
    },
  },
  components: {
    MyDataModal,
  },
}
</script>
<style lang="less" scoped>
.modal-content {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
}
</style>
