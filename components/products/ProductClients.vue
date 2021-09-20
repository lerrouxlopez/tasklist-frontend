<template>
  <div class="mt-8">
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <div>
          <span class="text-uppercase size-13">Offer</span>
          <v-select
            v-model="offer"
            outlined
            dense
            :items="offers"
            hide-details
            style="max-width: 200px"
            class="body-2"
          >
            <template #append>
              <v-icon class="mr-3 pt-2">mdi-chevron-down</v-icon>
            </template>
          </v-select>
        </div>
        <div class="px-3">
          <span class="text-uppercase size-13">Purchase Date</span>
          <v-select
            v-model="purchasedate"
            outlined
            dense
            :items="purchasedates"
            hide-details
            style="max-width: 150px"
            class="body-2"
          >
            <template #append>
              <v-icon class="mr-3 pt-2">mdi-chevron-down</v-icon>
            </template>
          </v-select>
        </div>
        <div>
          <span class="text-uppercase size-13">Status</span>
          <v-select
            v-model="stat"
            outlined
            dense
            :items="status"
            hide-details
            style="max-width: 150px"
            class="body-2"
          >
            <template #append>
              <v-icon class="mr-3 pt-2">mdi-chevron-down</v-icon>
            </template>
          </v-select>
        </div>
        <div class="pl-3 pt-6">
          <v-btn
            rounded
            elevation="0"
            class="body-2 text-uppercase px-6"
            color="primary"
          >
            Apply
          </v-btn>
        </div>
      </div>
      <div class="pt-6">
        <v-btn
          rounded
          elevation="0"
          class="body-2 text-uppercase px-6"
          color="primary"
          @click="newClient = true"
        >
          <v-icon left>mdi-plus</v-icon>
          New Client
        </v-btn>
      </div>
    </div>
    <div class="mt-3">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        hide-details
        solo
        flat
        placeholder="Search..."
      ></v-text-field>
    </div>
    <div class="mt-3">
      <v-data-table
        :headers="headers"
        :items="clients"
        :loading="load"
        :options="{
          itemsPerPage: 10,
        }"
        item-key="id"
        class="default_background ibial_black--text"
      >
        <template #[`item.offer`]="prop">
          <div class="primary--text">
            {{ prop.item.offer }}
          </div>
        </template>
        <template #[`item.status`]="prop">
          <div class="d-flex justify-space-between">
            <div>
              <v-btn
                :color="prop.item.status == 'Paid' ? '#4BA44F' : '#F8CD46'"
                small
                elevation="0"
                class="text-capitalize"
                :dark="prop.item.status == 'Pending' ? false : true"
              >
                {{ prop.item.status }}
              </v-btn>
            </div>
          </div>
        </template>
        <template #[`item.actions`]="{ item }">
          <div>
            <v-menu offset-y left min-width="100">
              <template #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  link
                  @click="
                    editClient = true
                    editTableSelected(item)
                  "
                >
                  <v-list-item-title class="body-2 ibial_black--text">
                    Edit
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title
                    class="body-2 red--text"
                    @click="deleteTableSelected(item)"
                  >
                    Delete
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="newClient" max-width="600">
      <NewClient @newClient="showClient" />
    </v-dialog>
    <v-dialog v-model="editClient" max-width="600">
      <EditClient
        :clientID="currentClientid"
        :clientName="currentClientname"
        :clientEmail="currentClientemail"
        :clientStatus="currentClientstat"
        :key="randomkey"
        @editClient="showEdit"
      />
    </v-dialog>
  </div>
</template>
<script>
export default {
  components: {
    NewClient: () => import('@/components/products/modals/NewClient'),
    EditClient: () => import('@/components/products/modals/EditClient'),
  },
  data() {
    return {
      newClient: false,
      editClient: false,
      offer: 'All Offers',
      purchasedate: '2021',
      stat: 'Any',
      purchasedates: ['2020', '2021', '2022'],
      status: ['Any', 'Paid', 'Pending'],
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
          text: 'Offer',
          value: 'offertitle',
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
        {
          text: '',
          value: 'actions',
          sortable: false,
          class: 'd-flex justify-end',
        },
      ],
      clients: [
        {
          name: 'Jake Peralta',
          email: 'jakeperalta@gmail.com',
          offerid: 42,
          purchasedate: 'Jan 1, 2021',
          status: 'Paid',
        },
      ],
      offers: ['Loading'],
      load: false,
      currentClientid: '',
      currentClientname: '',
      currentClientemail: '',
      currentClientstat: '',
      randomkey: 0,
    }
  },
  mounted() {
    console.log('hey there')
    this.getClients()
  },
  methods: {
    async getClients() {
      try {
        this.load = true
        const param = {
          resellerid: this.$auth.user.id,
          productid: this.$route.query.productid,
          transactionid: this.$route.query.transactionid,
        }
        const response = await this.$clientRepository.getClientsfromProducts(
          param
        )
        // this.offers = this.offers.offers
        this.clients = response.clients
        console.log('response: ', response)
        this.load = false
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },
    showClient(value) {
      this.newClient = value
      if (value === false) {
        this.getClients()
      }
    },
    showEdit(value) {
      this.editClient = value
      console.log('edit value: ', value)
      if (value === false) {
        this.getClients()
      }
    },
    showTableSelected(item) {
      this.currentOffer = item.id
      this.randomkey = Math.random()
      this.viewOffer = true
    },
    editTableSelected(item) {
      this.currentClientid = item.id
      this.currentClientname = item.name
      this.currentClientemail = item.email
      this.currentClientstat = item.stat
      this.randomkey = Math.random()
      console.log('Current Client: ', item.id)
    },
    async deleteTableSelected(item) {
      const clientid = item.id
      console.log('userID: ', clientid)
      try {
        const response = await this.$clientRepository.DeleteClient(clientid)
        console.log('response: ', response)
        this.getClients()
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },
  },
}
</script>
