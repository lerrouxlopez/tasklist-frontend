<template>
  <div>
    <v-card class="pa-6">
      <div class="d-flex justify-space-between">
        <div class="size-18 font-weight-bold pt-1">
          {{ offerName }}
        </div>
        <v-btn icon @click="$emit('viewOffer', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="pt-6 body-2">
        <v-row>
          <v-col cols="4">
            <div class="font-weight-bold">ID</div>
            <div class="pt-1">{{ offerID }}</div>
            <div class="font-weight-bold pt-5">Price</div>
            <div class="pt-1">
              {{ offerPrice }} ({{ offerPaymentType }}
              <template v-if="offerPaymentType === 'recurring'">
                - {{ offerFreq }} </template
              >)
            </div>
            <div class="font-weight-bold pt-5">Status</div>
            <div class="pl-6 pt-1">
              <v-badge
                v-if="offerStatus === 'Active'"
                left
                bottom
                color="green"
                dot
                offset-x="-8"
                offset-y="10"
              >
                {{ offerStatus }}
              </v-badge>
              <v-badge
                v-else
                left
                bottom
                color="red"
                dot
                offset-x="-8"
                offset-y="10"
              >
                {{ offerStatus }}
              </v-badge>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="font-weight-bold">Features</div>
            <ul class="pt-1">
              <li v-for="setting in extraSettings" :key="setting.id">
                <v-icon small color="primary">mdi-check</v-icon>
                {{ setting.optionname }}
                <template v-if="setting.customfield !== null"
                  >: {{ setting.customfield }}
                </template>
              </li>
            </ul>
            <div class="font-weight-bold pt-5">Extras</div>
            <div
              v-for="offerFile in offerFiles"
              :key="offerFile.id"
              class="pt-1"
            >
              -
              <a :href="offerFile.link">
                {{ offerFile.filetype }}
              </a>
              <v-icon small> mdi-arrow-top-right</v-icon>
            </div>
          </v-col>
          <v-col cols="4">
            <ul class="pt-4">
              <li v-for="item in extraFeatures" :key="item.optionname">
                <v-icon small color="primary">mdi-check</v-icon>
                {{ item.optionname }}
                <template v-if="item.customfield !== null"
                  >: {{ item.customfield }}</template
                >
              </li>
            </ul>
          </v-col>
        </v-row>
        <div class="mt-12">
          <div class="font-weight-bold ibial_black--text pb-3">
            Clients ({{ clientcount }})
          </div>
          <v-data-table
            :headers="headers"
            :items="clients"
            class="default_background ibial_black--text"
            hide-default-footer
          >
            <template #[`item.status`]="prop">
              <div>
                <v-btn
                  :color="prop.item.status == 'Pending' ? '#F8CD46' : '#4BA44F'"
                  small
                  elevation="0"
                  class="text-capitalize"
                  dark
                >
                  {{ prop.item.status }}
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </div>
        <div class="d-flex justify-end">
          <v-btn
            outlined
            rounded
            color="primary"
            class="mx-3"
            @click="
              editOffer = true
              $emit('viewOffer', false)
            "
          >
            Edit Offer
          </v-btn>
          <v-btn
            outlined
            rounded
            color="primary"
            @click="$emit('viewOffer', false)"
          >
            Close
          </v-btn>
        </div>
      </div>
    </v-card>
    <v-dialog v-model="editOffer" max-width="700">
      <EditOfferModal
        :key="offerID"
        :offerID="offerID"
        @editOffer="showOffer"
      />
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {
    EditOfferModal: () => import('@/components/products/modals/EditOfferModal'),
  },
  props: { offerID: { type: Number } },
  data() {
    return {
      editOffer: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Email Address',
          value: 'email',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Purchase Date',
          value: 'purchasedate',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Status',
          value: 'status',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
      ],
      clients: [],
      offer: [],
      offerName: 'Loading...',
      offerPrice: 'Loading...',
      offerPaymentType: 'Loading...',
      offerFreq: 'Loading...',
      offerStatus: 'Loading...',
      extraSettings: [],
      offerFiles: [],
      currency: '$',
      extraFeatures: [],
      clientcount: 0,
    }
  },
  mounted() {
    this.getOffer(this.offerID)
    this.getOfferSettings(this.offerID)
    this.getOfferFiles(this.offerID)
    this.getOfferClients(this.offerID)
  },
  methods: {
    showOffer(value) {
      this.editOffer = value
      if (value === false) {
        this.$emit('editOffer', false)
      }
    },
    async getOffer(offerID) {
      try {
        const param = {
          offerid: offerID,
        }
        const response = await this.$offerRepository.GetSingleOffer(param)
        // this.offers = this.offers.offers
        this.offer = response.offer[0]
        this.offerName = this.offer.offertitle
        this.offerPrice = this.offer.price
        this.offerPaymentType = this.offer.paymenttype
        this.offerFreq = this.offer.recurringfrequency
        this.offerStatus = this.offer.status
      } catch (error) {
        console.log(error)
      }
    },
    async getOfferSettings(offerID) {
      try {
        const param = {
          offerid: offerID,
        }
        const response = await this.$settingRepository.GetSettings(param)
        this.extraSettings = response.settings
        if (this.extraSettings.length > 2) {
          this.extraFeatures = this.extraSettings.splice(3)
        }
        this.load = false
      } catch (error) {
        console.log(error)
      }
    },
    async getOfferFiles(offerID) {
      try {
        const param = {
          offerid: offerID,
        }
        const response = await this.$fileRepository.GetFiles(param)
        this.offerFiles = response.files
      } catch (error) {
        console.log(error)
      }
    },
    async getOfferClients(offerID) {
      try {
        const param = {
          offerid: offerID,
        }
        const response = await this.$clientRepository.getOfferClients(param)
        this.clientcount = 0
        this.clients = response.clients
        this.clients.forEach((value, index) => {
          this.clientcount++
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}
</style>
