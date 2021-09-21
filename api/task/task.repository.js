const API_URL = process.env.productsAPIURL

export default ($axios) => ({
  GetProducts() {
    return $axios.$get(`${API_URL}/tasks`)
  },
})
