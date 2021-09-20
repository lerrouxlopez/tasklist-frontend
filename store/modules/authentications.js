const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}
const authentication = {
  getters,
}
// export default getters

export default authentication
