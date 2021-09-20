<template>
  <div>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mobile"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="item in links"
          :key="item.name"
          router
          exact
          @click="$router.push(item.link)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed dark app flat color="primary" class="px-6">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title
        class="text-uppercase pr-6 subtitle-1"
        @click="$router.push('/')"
      >
        To Do List
      </v-toolbar-title>
      <v-row v-if="!$vuetify.breakpoint.smAndDown" class="pl-6">
        <v-col>
          <v-btn
            text
            class="subtitle-2"
            :color="path !== '/' ? 'disable' : ''"
            @click="$router.push('/')"
          >
            <v-icon left>mdi-home</v-icon>
            Dashboard
          </v-btn>
          <v-btn
            text
            class="subtitle-2"
            :color="path !== '/productlist' ? 'disable' : ''"
            @click="$router.push('/tasklist')"
          >
            <v-icon left>mdi-layers</v-icon>
            Tasks
          </v-btn>
          <v-btn
            text
            class="subtitle-2"
            :color="path !== '/clients' ? 'disable' : ''"
            @click="$router.push('/users')"
          >
            <v-icon left>mdi-account-supervisor</v-icon>
            Users
          </v-btn>
        </v-col>
      </v-row>
      <v-spacer />
      <v-menu offset-y min-width="180">
        <template #activator="{ attrs, on }">
          <div v-bind="attrs" v-on="on">
            <v-avatar size="40" color="teal"></v-avatar>
            <span class="px-2 hidden-sm-and-down subtitle-2">{{
              $auth.user.name
            }}</span>
          </div>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title class="body-2" @click="logout"
              >Logout</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          icon: 'mdi-home',
          name: 'Dashboard',
          link: '/',
        },
        {
          icon: 'mdi-layers',
          name: 'Products',
          link: '/productlist',
        },
        {
          icon: 'mdi-account-supervisor',
          name: 'Clients',
          link: '/clients',
        },
        {
          icon: 'mdi-cog',
          name: 'Settings',
          link: '/settings',
        },
      ],
    }
  },
  computed: {
    path() {
      return this.$route.path
    },
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
