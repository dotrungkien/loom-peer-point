// Allows us to use ES6 in our migrations and tests.
require('babel-register')
const path = require('path')
const { readFileSync } = require('fs')
const { join } = require('path')
const LoomTruffleProvider = require('loom-truffle-provider')

module.exports = {
  contracts_build_directory: join(__dirname, './src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*' // Match any network id
    },
    loom: {
      provider: () => {
        const privateKey = readFileSync(
          path.join(__dirname, './private_key'),
          'utf-8'
        )
        const chainId = 'default'
        const writeUrl = 'http://127.0.0.1:46658/rpc'
        const readUrl = 'http://127.0.0.1:46658/query'

        const loomTruffleProvider = new LoomTruffleProvider(
          chainId,
          writeUrl,
          readUrl,
          privateKey
        )
        loomTruffleProvider.createExtraAccountsFromMnemonic(
          'gravity top burden flip student usage spell purchase hundred improve check genre',
          10
        )
        return loomTruffleProvider
      },
      network_id: '*'
    }
  }
}
