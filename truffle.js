// Allows us to use ES6 in our migrations and tests.
require('babel-register')
const { readFileSync } = require('fs')
const { join } = require('path')
const LoomTruffleProvider = require('loom-truffle-provider/dist')

const chainId = 'default'
const writeUrl = 'http://127.0.0.1:46658/rpc'
const readUrl = 'http://127.0.0.1:46658/query'
const privateKey = readFileSync('./private_key', 'utf-8')

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
loomTruffleProvider.createExtraAccounts(10)
module.exports = {
  contracts_build_directory: join(__dirname, './src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    loom: {
      provider: loomTruffleProvider,
      network_id: '*'
    }
  }
}
