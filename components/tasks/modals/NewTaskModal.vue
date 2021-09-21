<template>
  <div>
    <v-card class="pa-6">
      <div
        :class="e1 != 4 ? 'd-flex justify-space-between' : 'd-flex justify-end'"
      >
        <div v-if="e1 != 4" class="pt-1 size-18 font-weight-bold">New Task</div>
        <v-btn icon @click="$emit('newTask', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div>
        <span class="body-2 ibial_black--text">Task Name</span>
        <v-text-field
          v-model="taskname"
          dense
          outlined
          hide-details
          class="body-2 pb-3"
        ></v-text-field>
      </div>
      <div>
        <span class="body-2 ibial_black--text">Task Description</span>
        <v-text-field
          v-model="taskdescription"
          dense
          outlined
          hide-details
          class="body-2 pb-3"
        ></v-text-field>
      </div>
      <div>
        <span class="body-2 ibial_black--text">Status</span>
        <v-text-field
          v-model="taskstatus"
          dense
          outlined
          hide-details
          class="body-2 pb-3"
        ></v-text-field>
      </div>
      <div class="d-flex justify-end pt-3">
        <v-btn text outlined rounded @click="$emit('newTask', false)">
          Cancel
        </v-btn>
        <v-btn class="mx-3" color="primary" elevation="0" rounded> Save </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    createOffer() {},
  },
}
</script>
