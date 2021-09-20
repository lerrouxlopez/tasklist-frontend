<template>
  <div>
    <div>
      <v-toolbar color="primary" dark flat prominent>
        <v-toolbar-title class="title-container">
          {{ name }}
        </v-toolbar-title>
        <template #extension>
          <v-tabs v-model="activeTab" class="default-container mx-auto">
            <v-tab class="text-capitalize">Product Offers</v-tab>
            <v-tab class="text-capitalize">Clients</v-tab>
            <v-tab class="text-capitalize">White Label</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </div>
    <v-row class="default-container">
      <v-col>
        <div>
          <v-tabs-items v-model="activeTab">
            <v-tab-item>
              <ProductOffers />
            </v-tab-item>
            <v-tab-item>
              <ProductClients />
            </v-tab-item>
            <v-tab-item>
              <ProductWhitelabel />
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import ProductOffers from '@/components/products/ProductOffers'
export default {
  components: {
    // ProductOffers,
    ProductOffers: () => import('@/components/products/ProductOffers'),
    ProductClients: () => import('@/components/products/ProductClients'),
    ProductWhitelabel: () => import('@/components/products/ProductWhitelabel'),
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  created() {
    // console.log(this.productid)
    console.log('route: ', this.$route.query.productid)
  },
}
</script>

<style scoped>
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: rgba(0, 0, 0);
}
.default-background {
  background: #f8f9fb !important;
}
.title-container {
  width: 1100px;
  margin: 0 auto;
}
</style>
