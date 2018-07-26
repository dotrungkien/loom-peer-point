<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>assessment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ network }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>person_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ coinbase }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>account_balance_wallet</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ ethBalance }} ETH</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
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
  // import {NETWORKS} from './util/constants/networks'
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    data: () => ({
    }),
    methods: {
      handleRedeem: function () {
      }
    },
    computed: mapState({
      // isInjected:state => state.web3.isInjected,
      // network: state => NETWORKS[state.web3.networkId],
      // coinbase: state => state.web3.coinbase,
      // balance: state => state.web3.balance,
      // ethBalance: state => {
      //   if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
      // }
    }),
    beforeCreate () {
      // console.log('registerWeb3 Action dispatched Home.vue')
      // this.$store.dispatch('registerWeb3')
    }
  }
</script>
