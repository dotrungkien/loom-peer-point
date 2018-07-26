import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    setAccount (state, payload) {
      state.account = payload
    },
    setContract (state, payload) {
      state.contract = () => payload
    }
  },
  actions: {
    setAccount ({ commit }, payload) {
      commit('setAccount', payload)
    },
    setContract ({ commit }, payload) {
      commit('setContract', payload)
    }
  }
})
