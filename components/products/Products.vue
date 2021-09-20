<template>
  <div>
    <v-row>
      <v-col>
        <div class="mt-6"><h2>Products</h2></div>
        <div class="mt-8">
          <v-row>
            <v-col v-if="loading">
              <v-skeleton-loader
                max-width="300"
                type="card"
              ></v-skeleton-loader>
            </v-col>
            <v-col v-else-if="transactions.length === 0">No data</v-col>
            <v-col
              v-for="transaction in transactions"
              :key="transaction.id"
              v-else
              cols="4"
            >
              <v-card
                class="card-shadow"
                @click="
                  route(
                    transaction.product_name,
                    transaction.product_id,
                    transaction.id
                  )
                "
              >
                <div class="pa-6">
                  <div class="d-flex">
                    <v-img
                      :lazy-src="
                        'https://ibial.com/store/image/' +
                        transaction.product_info.image
                      "
                      max-height="40"
                      max-width="40"
                      :src="
                        'https://ibial.com/store/image/' +
                        transaction.product_info.image
                      "
                    ></v-img>
                    <span class="px-6 pt-2"
                      ><h3>{{ transaction.product_name }}</h3></span
                    >
                  </div>
                  <div class="body-2 pt-5 dark_gray--text">
                    <span class="font-weight-bold">3</span>
                    <span>Product offers</span>
                  </div>
                  <div class="body-2 pt-3 dark_gray--text">
                    <span class="font-weight-bold">40</span>
                    <span>Clients</span>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div class="mt-12">
          <div class="mt-6 sidebar_page--text">
            <h3>Available White-Label Products</h3>
          </div>
          <v-row>
            <v-col v-if="load">
              <v-skeleton-loader
                max-width="300"
                type="card"
              ></v-skeleton-loader>
            </v-col>
            <v-col v-else-if="products.length === 0">No data</v-col>
            <v-col
              v-else
              v-for="product in products"
              :key="product.id"
              cols="4"
            >
              <v-card class="card-shadow mt-8">
                <div class="pa-6">
                  <div class="d-flex">
                    <v-img
                      :lazy-src="
                        'https://ibial.com/store/image/' + product.image
                      "
                      max-height="40"
                      max-width="40"
                      :src="'https://ibial.com/store/image/' + product.image"
                    ></v-img>
                    <span class="px-6 pt-2"
                      ><h3>{{ product.meta_title }}</h3></span
                    >
                  </div>
                  <div class="body-2 pt-5 dark_gray--text">
                    <span>{{ product.meta_description }}</span>
                  </div>
                  <div class="mt-6 d-flex justify-end">
                    <v-btn rounded outlined class="px-3" color="dark_gray">
                      Resell
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['transactions', 'loading'],
  data() {
    return {
      products: [],
      load: true,
    }
  },
  computed: {},
  mounted() {
    this.getProducts()
  },
  methods: {
    route(product, productid, transactionid) {
      this.$router.push({
        path:
          '/product/' +
          product +
          '?productid=' +
          productid +
          '&transactionid=' +
          transactionid,
      })
    },
    async getProducts() {
      try {
        this.products = await this.$productRepository.GetProducts()
        console.log('Products: ', this.products)
        console.log('User ID: ', this.$auth.user.id)
        this.load = false
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },
  },
}
</script>
