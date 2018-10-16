import { Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js/dist'

import Web3 from 'web3'
import PeerPoint from '../contracts/PeerPoint.json'

export default class Contract {
  async start () {
    await this.getLoomAccount()
    await this.instantiateContract()
  }

  async getLoomAccount () {
    let etherWeb3 = window.web3
    etherWeb3 = new Web3(etherWeb3.currentProvider)
    await etherWeb3.eth.getCoinbase().then(address => {
      this.ethAccount = address
      let b64PrivateKey = localStorage.getItem(address)
      if (!b64PrivateKey) {
        b64PrivateKey = this.registerNewKey(address)
      }
      this.registerWeb3(b64PrivateKey)
    })
  }

  registerNewKey (address) {
    let privateKey = CryptoUtils.generatePrivateKey()
    let b64PrivateKey = CryptoUtils.Uint8ArrayToB64(privateKey)
    localStorage.setItem(address, b64PrivateKey)
    return b64PrivateKey
  }

  registerWeb3 (b64PrivateKey) {
    const privateKey = CryptoUtils.B64ToUint8Array(b64PrivateKey)
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    const loomAccount = LocalAddress.fromPublicKey(publicKey).toString()
    this.loomAccount = loomAccount
    const client = new Client(
      'default',
      'ws://127.0.0.1:46657/websocket',
      'ws://127.0.0.1:9999/queryws'
    )
    client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
    })

    const web3 = new Web3(new LoomProvider(client, privateKey))
    this.web3 = web3
  }

  instantiateContract () {
    const abi = PeerPoint.abi
    const networkId = 'default'
    const currentNetwork = PeerPoint.networks[networkId]
    const contractAddress = currentNetwork.address

    this.contract = new this.web3.eth.Contract(abi, contractAddress, {
      from: this.loomAccount
    })
  }

  async call (methodName, ...args) {
    let result = await this.contract.methods[methodName](...args).call()
    return result
  }

  async send (methodName, ...args) {
    await this.contract.methods[methodName](...args).send()
  }
}
