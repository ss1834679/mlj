const globalModules = {
  state: {
    isSdkReady: false,
    isCalling: false,
    rtcConfig: {},
    systemInfo: {}
  },
  getters: {
    isSdkReady: state => state.isSdkReady,
    isCalling: state => state.isCalling,
    rtcConfig: state => state.rtcConfig
  },
  mutations: {
    showToast(state, payload) {
      uni.showToast({
        title: payload.title,
        icon: payload.icon || 'none',
        duration: payload.duration || 800
      })
    },
    setSdkReady(state, payload) {
      state.isSdkReady = payload
    },
    setCalling(state, payload) {
      state.isCalling = payload
    },
    setRtcConfig(state, payload) {
      state.rtcConfig = payload
    },
    setSystemInfo(state, payload) {
      state.systemInfo = payload
    }
  },
  actions: {
    resetStore(context) {
      context.commit('resetGroup')
      context.commit('resetUser')
      context.commit('resetCurrentConversation')
      context.commit('resetAllConversation')
    }
  }
}

export default globalModules
