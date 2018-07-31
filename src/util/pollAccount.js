import Web3 from 'web3'
import { store } from '../store'

let pollAccount = function () {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)
  setInterval(async () => {
    if (!web3) return
    let contract = store.state.contract()
    let user = contract.user
    await store.dispatch('setAccount', user)
    let sent = await contract.sent()
    await store.dispatch('setSent', sent)
    let received = await contract.received()
    await store.dispatch('setReceived', received)
    let available = await contract.available()
    await store.dispatch('setAvailable', available)
    store.dispatch('setContractLoaded', true)
  }, 1000)
}

export default pollAccount
