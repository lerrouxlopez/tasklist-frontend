<template>
  <v-row class="default-container">
    <v-col>
      <Dashboard />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { Dashboard } from '~/components/main'

// import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Dashboard,
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
}
</script>
