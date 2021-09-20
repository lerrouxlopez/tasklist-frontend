import Vuex from 'vuex'
import transactionModule from './modules/transactions'
// import authenticationModule from './modules/authentications'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      // authentication: authenticationModule,
      transactions: transactionModule,
    },
  })
}

/* const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}

const multiExport = {
  createStore,
  getters,
}

export default multiExport */
export default createStore
