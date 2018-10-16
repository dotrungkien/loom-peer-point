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
    loomAccount: null,
    ethAccount: null,
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
    setLoomAccount: mutateKey('loomAccount'),
    setEthAccount: mutateKey('ethAccount'),
    setSent: mutateKey('sent'),
    setReceived: mutateKey('received'),
    setAvailable: mutateKey('available'),
    setContractLoaded: mutateKey('contractLoaded')
  },
  actions: {
    setContract: commitChange('setContract'),
    setLoomAccount: commitChange('setLoomAccount'),
    setEthAccount: commitChange('setEthAccount'),
    setSent: commitChange('setSent'),
    setReceived: commitChange('setReceived'),
    setAvailable: commitChange('setAvailable'),
    setContractLoaded: commitChange('setContractLoaded')
  }
})
