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
          @click="newTask = true"
        >
          <v-icon left>mdi-plus</v-icon>
          New Task
        </v-btn>
      </div>
    </div>
    <div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="tasks"
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
    <v-dialog v-model="newTask" max-width="700">
      <NewTaskModal @newTask="showTask" />
    </v-dialog>
    <v-dialog v-model="viewTask" max-width="985">
      <ViewTaskModal
        :taskID="currentTask"
        :key="randomkey"
        @viewTask="showView"
        @editTask="showEdit"
      />
    </v-dialog>
    <v-dialog v-model="editTask" max-width="700">
      <EditTaskModal
        :taskID="currentTask"
        :key="randomkey"
        @editTask="showEdit"
      />
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {
    NewTaskModal: () => import('@/components/tasks/modals/NewTaskModal'),
    EditTaskModal: () => import('@/components/tasks/modals/NewTaskModal'),
    ViewTaskModal: () => import('@/components/tasks/modals/NewTaskModal'),
  },
  data() {
    return {
      selected: [],
      newTask: false,
      editTask: false,
      viewTask: false,
      active: 'Ongoing Tasks',
      items: ['Ongoing Tasks', 'Completed Tasks', 'All'],
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Task Name',
          value: 'taskname',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Description',
          value: 'description',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
          width: '30%',
        },
        {
          text: 'Assigned To',
          value: 'qtysold',
          class: 'body-2 font-weight-bold text-uppercase dark_gray--text',
        },
        {
          text: 'Assigned By',
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
      tasks: [],
      load: true,
      currentTask: 0,
      randomkey: 0,
    }
  },
  mounted() {
    this.load = false
  },
  methods: {
    showTask(value) {
      this.newTask = value
    },
    showView(value) {
      this.viewTask = value
    },
    showEdit(value) {
      this.editTask = value
    },
    async getTasks() {
      this.load = true
      try {
        const token = localStorage.getItem('auth._token.local')
        const param = {
          resellerid: this.$auth.user.id,
          productid: this.$route.query.productid,
          transactionid: this.$route.query.transactionid,
        }
        const response = await this.$offerRepository.GetOffers(param, token)
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
