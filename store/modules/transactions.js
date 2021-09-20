const state = () => ({
  transactions: [],
  uservalidations: [],
})

const getters = {
  getTransactions(state) {
    return state.transactions
  },
  getUserActivations(state) {
    return state.uservalidations
  },
}

const mutations = {
  GET_TRANSACTIONS(state, payload) {
    state.transactions = payload
  },
  GET_USERVALIDATIONS(state, payload) {
    state.uservalidations = payload
  },
}

const actions = {
  async getTransactions(context, payload) {
    let transactions = []
    try {
      transactions = await this.$transactionRepository.GetTransactions(payload)
      // console.log('here')
      // console.log('Transactions : ', transactions.data.transaction)
    } catch (error) {
      console.log(error)
    }
    context.commit('GET_TRANSACTIONS', transactions)
  },
  async getUserActivations(context, payload) {
    let uservalidations = []
    try {
      uservalidations = await this.$TransactionRepository.GetAccountValidation(
        payload
      )
      // console.log(products)
    } catch (error) {
      console.log(error)
    }
    context.commit('GET_USERVALIDATIONS', uservalidations)
  },
}

const transactionModule = {
  state,
  getters,
  mutations,
  actions,
}

export default transactionModule
