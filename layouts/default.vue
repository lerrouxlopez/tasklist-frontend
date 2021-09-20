<template>
  <v-app>
    <Header
      v-if="
        $auth.loggedIn &&
        path !== 'client_dashboard' &&
        path !== 'demo' &&
        paymentpath !== '/product/payment'
      "
    />
    <ClientHeader v-else-if="path === 'client_dashboard'" />
    <DemoHeader v-else-if="path === 'demo'" />
    <v-main class="main-container">
      <SidebarDrawer v-if="path === 'demo'" />
      <nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { Header } from '@/components/main'

export default {
  components: {
    Header,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    path() {
      return this.$route.path.split('/')[1]
    },
    paymentpath() {
      return this.$route.path
    },
  },
}
</script>

<style>
.v-application {
  background: #f8f9fb !important;
}
.main-container {
  padding: 64px 0 36px !important;
}
.default-container {
  max-width: 1100px;
  margin: 0 auto;
}
.demo-container {
  height: 100%;
}
.full-width {
  width: 100%;
}
.bottom__line--border {
  box-shadow: inset 0 -1px 0 #ebecef;
}
.right__line--border {
  box-shadow: inset -1px 0 0 #ebecef;
}
.demo__panel {
  margin-left: 70px;
}
</style>
