import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '',
    title: 'Todo List',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap',
        // href: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap"',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-apexcharts.js', mode: 'client' },
    { src: '~/plugins/repository', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: 'getUser',
            method: 'post',
            propertyName: 'success',
          },
          logout: false,
        },
      },
      google: {
        clientId: '...',
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
    },
  },

  router: {
    middleware: ['auth'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // change this URL to the laravel backend's URL
  axios: {
    baseURL: 'https://tasklist.vici.test/api',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#C257F6',
          disable: '#BEF5EA',
          dark_gray: '#596366',
          sidebar_page: '#737E92',
          default_background: '#f8f9fb',
          ibial_black: '#131416',
          medium_gray: '#A0A8B0',
          gray4: '#BDBDBD',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // environment variables
  env: {
    // apiURL: 'https://whitelabel.ibial.test/api',
    appURL: 'https://localhost:3000',
    apiURL: 'https://tasklist.vici.test/api',
    transactionsAPIURL: 'https://dev.ibial.com/licenses/api/records',
    productsAPIURL: 'https://ibial.com/store/index.php?route=api/product',
  },
}
