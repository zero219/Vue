import Vue from 'vue'
// 事件总线
// 接收消息，Bus.$on('msg',(val)=>{console.log(val)})
// 发送消息，Bus.$emit('msg','发送消息')
const Bus = new Vue()

export default Bus