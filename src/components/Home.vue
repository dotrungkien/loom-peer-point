<template>
  <v-flex text-xs-center>
    <!-- <h1>Balance: {{ balance }}</h1> -->
    <h1>Loom Account Address: {{ account }}</h1>
    <h1>Point received: {{ received }}</h1>
    <h2>Available point to send: {{ available }}</h2>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="toAddress"
            :rules="toAddressRules"
            label="Address"
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
  import Contract from '../util/contract'

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
      submit () {
      },
      clear () {
        this.$refs.form.reset()
      }
    },
    computed: {
      ...mapState([
        'account',
        'contract',
        'received',
        'available'
      ]),
      balance: async function () {
        let balance = await this.contract().pointOf(this.account)
        return balance
      }
    },
    created: async function () {
      if (!this.contract) {
        let contract = new Contract()
        await contract.start()
        this.$store.dispatch('setContract', contract)
        let user = contract.getUser()
        this.$store.dispatch('setAccount', user)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3 {
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
