<template>
  <div>
    <v-card class="py-6 px-8">
      <div class="d-flex justify-space-between">
        <h3 class="pt-1">Edit Client</h3>
        <v-btn icon @click="$emit('editClient', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="mt-6">
        <div>
          <span class="body-2 ibial_black--text">Name</span>
          <v-text-field
            v-model="name"
            :placeholder="clientName"
            dense
            :value="clientName"
            outlined
            hide-details
            class="body-2 pb-3"
          ></v-text-field>
        </div>
        <div>
          <span class="body-2 ibial_black--text">Email Address</span>
          <v-text-field
            v-model="email"
            :placeholder="clientEmail"
            dense
            outlined
            :value="clientEmail"
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
            @click="$emit('editClient', false)"
          >
            Discard Changes
          </v-btn>
          <v-btn
            rounded
            color="primary"
            elevation="0"
            @click="
              editClients()
              $emit('editClient', false)
            "
          >
            Save
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    clientID: { type: Number },
    clientName: { type: String },
    clientEmail: { type: String },
    clientStatus: { type: String },
  },
  data() {
    return {
      offer: 'Unicon Basic',
      offers: ['Unicon Basic', 'Unicon Pro', 'Unicon Advance'],
      stat: 'Paid',
      name: this.clientName,
      email: this.clientEmail,
    }
  },
  methods: {
    async editClients() {
      try {
        const param = {
          name: this.name,
          email: this.email,
          status: this.stat,
        }
        const response = await this.$clientRepository.EditClient(
          param,
          this.clientID
        )
        console.log('Offer Saved! Response: ', response)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
