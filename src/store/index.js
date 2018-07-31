import Vue from 'vue'
import Vuex from 'vuex'

const mutateKey = key => (state, val) => {
  state[key] = val
}

const commitChange = change => ({ commit }, payload) => {
  commit(change, payload)
}

Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state: {
    contractLoaded: false,
    account: null,
    contract: null,
    sent: null,
    received: null,
    available: null
  },
  mutations: {
    setContract: (state, val) => {
      state.contract = () => val
      console.log('register contract completed!', val)
    },
    setAccount: mutateKey('account'),
    setSent: mutateKey('sent'),
    setReceived: mutateKey('received'),
    setAvailable: mutateKey('available'),
    setContractLoaded: mutateKey('contractLoaded')
  },
  actions: {
    setContract: commitChange('setContract'),
    setAccount: commitChange('setAccount'),
    setSent: commitChange('setSent'),
    setReceived: commitChange('setReceived'),
    setAvailable: commitChange('setAvailable'),
    setContractLoaded: commitChange('setContractLoaded')
  }
})
