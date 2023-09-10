<template>
  <transition name="slide">
    <div class="my-data-modal" :class="modalClass" v-show="showModal">
      <div class="mask"></div>
      <div
        class="modal-dialog"
        :style="{ width: modalDialogWidth, 'max-height': modalHeight }"
      >
        <div class="modal-header">
          <slot name="header">
            <span class="title">{{ title }}</span>
          </slot>
          <span class="close" @click="hide('close')" v-if="showClose"
            ><i class="el-icon-circle-close"></i
          ></span>
        </div>
        <div class="modal-body" :style="{ 'max-height': modalBodyHeight }">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer" v-if="showFooter">
          <slot name="footer">
            <div class="btn-group">
              <el-button @click="hide('cancel')" :disabled="cancelDisabled">{{
                cancelText
              }}</el-button>
              <slot name="buttons"></slot>
              <el-button
                type="primary"
                @click="$emit('ok')"
                v-if="showOk"
                :disabled="okDisabled"
                :loading="loading"
                >{{ loading ? '请稍后' : okText }}</el-button
              >
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * 组件说明
 * 该组件为全局统一的弹窗内容复杂组件， 例如新增/编辑类的弹窗，
 * 可配置 提示标题，内容，确认取消按钮等
 *
 * **/
export default {
  name: 'my-data-modal',
  props: {
    title: String, // 标题
    // 如应用该组件的样式采用scoped，请在子元素上使用/deep/完成穿透
    customClass: {
      type: String,
      default: '',
    },
    showClose: {
      // 是否显示取消按钮
      type: Boolean,
      default: true,
    },
    showOk: {
      // 是否显示确认按钮
      type: Boolean,
      default: true,
    },
    showFooter: {
      // 是否显示底部栏
      type: Boolean,
      default: true,
    },
    size: {
      // 弹窗大小
      type: String,
      default: 'md', // sm, md, lg, xl
    },
    scrollable: {
      // 是否自定义弹窗样式
      type: Boolean,
      default: false,
    },
    width: String, // 对话框的指定宽度(或百分比)
    okText: {
      // 确认按钮名称
      type: String,
      default: '确定',
    },
    cancelText: {
      // 取消按钮名称
      type: String,
      default: '关闭',
    },
    cancelDisabled: {
      // 取消按钮是否可编辑
      type: Boolean,
      default: false,
    },
    okDisabled: {
      // 确认按钮是否可编辑
      type: Boolean,
      default: false,
    },
    loading: {
      // 是否显示加载效果
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showModal: false,
    modalSizes: [
      { size: 'sm', value: '300px' },
      { size: 'md', value: '600px', default: true },
      { size: 'lg', value: '900px' },
      { size: 'xl', value: '1200px' },
    ],
  }),
  computed: {
    modalDialogWidth() {
      if (this.width) {
        const width = this.width + ''
        const units = ['%', 'px', 'vw', 'em', 'rem']
        return units.some((item) => width.endsWith(item))
          ? width
          : parseFloat(width) + 'px'
      }
      const item =
        this.modalSizes.find((item) => item.size === this.size) ||
        this.modalSizes.find((item) => item.default)
      return item.value
    },
    modalBodyHeight() {
      return `${parseInt(this.modalHeight) - 120}px`
    },
    modalHeight() {
      return `${document.documentElement.clientHeight * 0.5}px`
    },
    modalClass() {
      return `${this.scrollable ? 'modal-scroll' : ''} ${this.customClass}`
    },
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide(evt = '') {
      this.showModal = false
      this.$emit('reset')
      evt && this.$emit(evt)
    },
  },
}
</script>

<style lang="less">
@import './index.less';
</style>
