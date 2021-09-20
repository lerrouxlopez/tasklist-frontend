const API_URL = process.env.productsAPIURL

export default ($axios) => ({
  GetProducts() {
    return $axios.$get(`${API_URL}/getProducts`)
  },
  GetLatestProducts() {
    const data = new FormData()
    data.append('limit', 5)
    return $axios.$post(`${API_URL}/getLatestProducts`, data)
  },
  GetProduct(id) {
    const data = new FormData()
    data.append('product_id', id)
    return $axios.$post(`${API_URL}/getProduct`, data)
  },
})
