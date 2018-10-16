import { store } from '../store'

let pollAccount = () => {
  setInterval(async () => {
    let contract = store.state.contract()
    let loomAccount = contract.loomAccount
    await store.dispatch('setLoomAccount', loomAccount)
    let ethAccount = contract.ethAccount
    await store.dispatch('setEthAccount', ethAccount)
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
