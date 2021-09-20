<template>
  <div class="mt-8">
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <span class="body-2 dark_gray--text pt-2">Show:</span>
        <v-select
          v-model="active"
          :items="items"
          dense
          hide-details
          style="max-width: 50%"
          class="px-6 body-2"
        >
          <template #append>
            <v-icon>mdi-chevron-down</v-icon>
          </template>
        </v-select>
      </div>
      <div class="pb-3">
        <v-btn
          rounded
          elevation="0"
          class="body-2 text-uppercase px-6"
          color="primary"
          @click="newOffer = true"
        >
          <v-icon left>mdi-plus</v-icon>
          New Offer
        </v-btn>
      </div>
    </div>
    <div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="offers"
        :loading="load"
        :options="{
          itemsPerPage: 5,
        }"
        item-key="id"
        show-select
        class="default_background ibial_black--text"
      >
        <template #[`item.status`]="prop">
          <div class="text-center">
            <v-badge
              left
              bottom
              color="primary"
              dot
              offset-x="-8"
              offset-y="10"
            >
              {{ prop.item.status }}
            </v-badge>
          </div>
        </template>
        <template #[`item.qty`]="prop">
          <div class="text-center">{{ prop.item.qty }}</div>
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="d-flex justify-end">
            <v-tooltip top color="ibial_black">
              <template #activator="{ on, attrs }">
                <v-hover v-slot="{ hover }">
                  <v-btn
                    class="mx-2"
                    icon
                    small
                    :color="hover ? 'primary' : ''"
                    v-bind="attrs"
                    v-on="on"
                    @click="showTableSelected(item)"
                  >
                    <v-icon dark>mdi-eye</v-icon>
                  </v-btn>
                </v-hover>
              </template>
              <span>View offer</span>
            </v-tooltip>
            <v-tooltip top color="ibial_black">
              <template #activator="{ on, attrs }">
                <v-hover v-slot="{ hover }">
                  <v-btn
                    class="mx-2"
                    icon
                    small
                    :color="hover ? 'primary' : ''"
                    v-bind="attrs"
                    v-on="on"
                    @click="shareModal = true"
                  >
                    <v-icon dark>mdi-share-variant</v-icon>
                  </v-btn>
                </v-hover>
              </template>
              <span>Share hosted payment page</span>
            </v-tooltip>
            <v-menu offset-y left>
              <template #activator="{ on: menu, attrs }">
                <v-tooltip top color="ibial_black">
                  <template #activator="{ on: tooltip }">
                    <v-hover v-slot="{ hover }">
                      <v-btn
                        class="mx-2"
                        icon
                        small
                        :color="hover ? 'primary' : ''"
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
                      >
                        <v-icon dark>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </v-hover>
                  </template>
                  <span>More actions</span>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item link>
                  <v-list-item-title
                    class="body-2 ibial_black--text"
                    @click="
                      editOffer = true
                      editTableSelected(item)
                    "
                  >
                    Edit product offer
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title class="body-2 ibial_black--text">
                    View payment page
                    <v-icon small>mdi-arrow-top-right</v-icon>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title class="body-2 ibial_black--text">
                    Mark offer as inactive
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title class="body-2 red--text">
                    Delete
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="shareModal" max-width="600">
      <SharePaymentModal />
    </v-dialog>
    <v-dialog v-model="newOffer" max-width="700">
      <NewOfferModal @newOffer="showOffer" />
    </v-dialog>
    <v-dialog v-model="viewOffer" max-width="985">
      <ViewOfferModal
        :offerID="currentOffer"
        :key="randomkey"
        @viewOffer="showView"
        @editOffer="showEdit"
      />
    </v-dialog>
    <v-dialog v-model="editOffer" max-width="700">
      <EditOfferModal
        :offerID="currentOffer"
        :key="randomkey"
        @editOffer="showEdit"
      />
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {
    SharePaymentModal: () =>
      import('@/components/products/modals/SharePaymentModal'),
    NewOfferModal: () => import('@/components/products/modals/NewOfferModal'),
    ViewOfferModal: () => import('@/components/products/modals/ViewOfferModal'),
    EditOfferModal: () => import('@/components/products/modals/EditOfferModal'),
  },
  data() {
    return {
      selected: [],
      newOffer: false,
      editOffer: false,
      shareModal: false,
      viewOffer: false,
      active: 'Active offers',
      items: ['Active offers', 'Inactive offers', 'All'],
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Offer Title',
          value: 'offertitle',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
          width: '30%',
        },
        {
          text: 'Price',
          value: 'price',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Qty Sold',
          value: 'qtysold',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Revenue',
          value: 'revenue',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Status',
          value: 'status',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
          class: 'd-flex justify-end',
        },
      ],
      data: [],
      offers: [],
      load: true,
      currentOffer: 0,
      randomkey: 0,
    }
  },
  mounted() {
    this.getOffers()
  },
  methods: {
    showOffer(value) {
      this.newOffer = value
      if (value === false) {
        this.getOffers()
      }
    },
    showView(value) {
      this.viewOffer = value
    },
    showEdit(value) {
      this.editOffer = value
      if (value === false) {
        this.getOffers()
      }
    },
    showTableSelected(item) {
      this.currentOffer = item.id
      this.randomkey = Math.random()
      this.viewOffer = true
    },
    editTableSelected(item) {
      this.currentOffer = item.id
      this.randomkey = Math.random()
      this.editOffer = true
    },
    async getOffers(productid, resellerid) {
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
  },
}
</script>
