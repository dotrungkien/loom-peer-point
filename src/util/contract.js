import { Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js/dist'

import Web3 from 'web3'
import PeerPoint from '../contracts/PeerPoint.json'

function getClient (privateKey, publicKey) {
  return new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:9999/queryws'
  )
}

export default class Contract {
  async start () {
    await this.registerWeb3()
    await this.instantiateContract()
    let etherWeb3 = window.web3
    etherWeb3 = new Web3(etherWeb3.currentProvider)
    await etherWeb3.eth.getCoinbase().then(result => {
      this.etherAddress = result
    })
  }

  registerWeb3 () {
    const privateKey = CryptoUtils.generatePrivateKey()
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    const client = getClient(privateKey, publicKey)
    client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
    })

    const from = LocalAddress.fromPublicKey(publicKey).toString()
    const web3 = new Web3(new LoomProvider(client, privateKey))
    this.web3 = web3
    this.user = from
  }

  instantiateContract () {
    const abi = PeerPoint.abi
    const networkId = 'default'
    const currentNetwork = PeerPoint.networks[networkId]
    const contractAddress = currentNetwork.address

    this.contract = new this.web3.eth.Contract(abi, contractAddress, {
      from: this.user
    })
  }

  async login () {
    await this.contract.methods.etherToLoomAddress(this.etherAddress).call()
  }

  getUser () {
    return this.user
  }

  async sent () {
    let point = await this.contract.methods.sentPoints(this.user).call()
    return point
  }

  async received () {
    let point = await this.contract.methods.balanceOf(this.user).call()
    return point
  }

  async available () {
    let point = await this.contract.methods.pointOf(this.user).call()
    return point
  }

  async redeem () {
    await this.contract.methods.redeem().send()
  }

  async sendPoint (to, value, message) {
    await this.contract.methods.sendPoint(to, value, message).send()
  }
}
