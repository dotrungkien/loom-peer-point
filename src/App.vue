<template>
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link
            to="/"
            tag="span"
            style="cursor: pointer"
            >
            Peer Point
          </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="handleRedeem"><v-icon left>add_circle_outline</v-icon>Redeem</v-btn>
        <v-btn flat to="/transactions"><v-icon left>list</v-icon>Transactions</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
        >
          <router-view ></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Contract from './util/contract'
import pollAccount from './util/pollAccount'
import { mapState } from 'vuex'

export default {
  name: 'app',
  data: () => ({
  }),
  computed: mapState([
    'contract'
  ]),
  methods: {
    handleRedeem: async function () {
      let contract = this.contract()
      await contract.redeem()
    }
  },
  created: async function () {
    let contract = new Contract()
    await contract.start()
    await this.$store.dispatch('setContract', contract)
    let user = contract.user
    await this.$store.dispatch('setAccount', user)
    let received = await contract.received()
    await this.$store.dispatch('setReceived', received)
    let available = await contract.available()
    await this.$store.dispatch('setAvailable', available)
    this.$store.dispatch('setContractLoaded', true)
    pollAccount()
  }
}
</script>
