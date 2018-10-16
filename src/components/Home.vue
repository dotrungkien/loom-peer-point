<template>
  <v-flex text-xs-center>
    <h1>Eth Account Address: {{ ethAccount }}</h1>
    <h1>Loom Account Address: {{ loomAccount }}</h1>
    <h1>Sent: {{ sent }}</h1>
    <h1>Received: {{ received }}</h1>
    <h1>Available: {{ available }}</h1>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="toAddress"
            :rules="toAddressRules"
            label="To"
            required
          ></v-text-field>
          <v-text-field
            v-model="amount"
            :rules="amountRules"
            label="Amount"
            required
          ></v-text-field>

          <v-text-field
            v-model="message"
            label="Message"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data: () => ({
    valid: false,
    toAddress: '',
    amount: '',
    message: 'From Framgia Inc with <3',
    toAddressRules: [
      v => !!v || 'Address is required'
    ],
    amountRules: [
      v => !!v || 'Amount is required'
    ]
  }),
  methods: {
    submit: function () {
      let contract = this.contract()
      let web3 = contract.web3
      contract.sendPoint(
        this.toAddress,
        this.amount,
        web3.utils.sha3(this.message)
      )
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  computed: {
    ...mapState([
      'contract',
      'ethAccount',
      'loomAccount',
      'sent',
      'received',
      'available'
    ]),
    balance: async function () {
      let balance = await this.contract().pointOf(this.account)
      return balance
    }
  }
}
</script>

<style scoped>
h1,
h2,
h3 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
