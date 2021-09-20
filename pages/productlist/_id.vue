<template>
  <div class="default-container">
    <Products :transactions="transactions" :loading="loading" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { Products } from '@/components/products'
export default {
  components: {
    Products,
  },
  data() {
    return {
      transactions: [],
      loading: true,
    }
  },
  mounted() {
    this.getTransactions()
  },
  methods: {
    async getTransactions() {
      const userdata = {
        email: this.$auth.user.email,
        type: 'reseller',
      }
      try {
        this.transactions = await this.$transactionRepository.GetTransactions(
          userdata
        )
        this.loading = false
        this.transactions = this.transactions.data.transaction
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
}
</script>
