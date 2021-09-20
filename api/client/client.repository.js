const API_URL = process.env.apiURL

export default ($axios) => ({
  AddClient(param) {
    return $axios.$post(`${API_URL}/register`, param)
  },
})
