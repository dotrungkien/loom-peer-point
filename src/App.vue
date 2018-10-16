<template>
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>Peer Point on Loom Dappchain</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="handleRedeem">
          <v-icon left>add_circle_outline</v-icon>Redeem
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Contract from './util/contract'
import pollAccount from './util/pollAccount'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  data: () => ({
  }),
  computed: mapState([
    'contract'
  ]),
  methods: {
    handleRedeem: function () {
      let contract = this.contract()
      contract.send('redeem')
    },
    ...mapActions([
      'setContract',
      'setLoomAccount',
      'setEthAccount',
      'setReceived',
      'setAvailable',
      'setContractLoaded'
    ])
  },
  created: async function () {
    let contract = new Contract()
    await contract.start().then(() => {
      this.setContract(contract)
      this.setEthAccount(contract.ethAccount)
      this.setLoomAccount(contract.loomAccount)
      this.setContractLoaded(true)
      pollAccount()
    })
  }
}
</script>
