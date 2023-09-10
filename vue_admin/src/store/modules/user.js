import { getInfo, setInfo } from '../../utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo('userInfo')
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo('userInfo', obj)
    }
  },
  actions: {},
  getters: {},
}
