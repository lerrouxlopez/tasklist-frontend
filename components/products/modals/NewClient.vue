<template>
  <div>
    <v-card class="py-6 px-8">
      <div class="d-flex justify-space-between">
        <h3 class="pt-1">New Client</h3>
        <v-btn icon @click="$emit('newClient', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="mt-6">
        <div>
          <span class="body-2 ibial_black--text">Name</span>
          <v-text-field
            v-model="name"
            placeholder="John Doe"
            dense
            outlined
            hide-details
            class="body-2 pb-3"
          ></v-text-field>
        </div>
        <div>
          <span class="body-2 ibial_black--text">Email Address</span>
          <v-text-field
            v-model="email"
            placeholder="john@sample.com"
            dense
            outlined
            hide-details
            class="body-2 pb-3"
          ></v-text-field>
        </div>
        <div>
          <span class="body-2 ibial_black--text">
            {{ $route.path == '/clients' ? 'Product' : 'Offer' }}
          </span>
          <v-select
            v-model="offer"
            outlined
            dense
            :items="offers"
            item-text="offertitle"
            item-value="id"
            hide-details
            class="body-2 pb-3"
            @change="getofferID()"
          >
            <template #append>
              <v-icon class="mr-3 pt-2">mdi-chevron-down</v-icon>
            </template>
          </v-select>
        </div>
        <div>
          <span class="body-2 ibial_black--text">Purchase Date</span>
          <v-text-field
            v-model="purchasedate"
            dense
            type="date"
            outlined
            hide-details
            class="body-2 pb-3"
          ></v-text-field>
        </div>
        <div>
          <span class="body-2 ibial_black--text">Status</span>
          <v-radio-group v-model="stat" row mandatory class="mt-1">
            <v-radio class="body-2" value="Paid">
              <template #label>
                <div class="body-2 ibial_black--text">Paid</div>
              </template>
            </v-radio>
            <v-radio class="body-2" value="Pending">
              <template #label>
                <div class="body-2 ibial_black--text">Pending</div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
        <div class="mt-6 d-flex justify-end">
          <v-btn
            outlined
            rounded
            class="mx-3"
            @click="$emit('newClient', false)"
          >
            Cancel
          </v-btn>
          <v-btn
            rounded
            color="primary"
            elevation="0"
            @click="
              createClient()
              $emit('newClient', false)
            "
          >
            Save New Client
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offer: 'Unicon Basic',
      offers: [],
      stat: 'Paid',
      offerid: '',
      name: '',
      email: '',
      purchasedate: '',
    }
  },
  mounted() {
    this.getOffers()
  },
  methods: {
    async createClient() {
      try {
        const param = {
          resellerid: this.$auth.user.id,
          offerid: this.offer,
          name: this.name,
          email: this.email,
          purchasedate: this.purchasedate,
          status: this.stat,
        }
        console.log('Client Param: ', param)
        const response = await this.$clientRepository.AddClient(param)
        return response.offer.id
      } catch (err) {
        console.log(err)
      }
    },
    async getOffers() {
      this.load = true
      try {
        const param = {
          resellerid: this.$auth.user.id,
          productid: this.$route.query.productid,
          transactionid: this.$route.query.transactionid,
        }
        const response = await this.$offerRepository.GetOffers(param)
        // this.offers = this.offers.offers
        this.offers = response.offers
        console.log('response: ', response)
        this.load = false
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },
    getofferID(offerid) {
      console.log('offerID: ', this.offer)
    },
  },
}
</script>
