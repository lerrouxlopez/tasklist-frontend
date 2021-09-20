<template>
  <div class="container">
    <v-card class="px-12 pb-12 pt-6 mt-6 mx-auto card-shadow" max-width="500">
      <div class="px-6 mx-6">
        <div class="text-center">
          <h1 class="font-weight-bold">Login</h1>
        </div>
        <div>
          <v-text-field
            v-model="email"
            color="primary"
            name="email"
            placeholder="Your Email Address"
            hide-details
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="password"
            color="primary"
            type="password"
            name="password"
            placeholder="Password"
            @keyup.enter="login"
          ></v-text-field>
        </div>
        <div>
          <v-btn
            rounded
            color="primary"
            class="text-capitalize white--text mt-4"
            block
            depressed
            :loading="loading"
            @click="login"
          >
            Login
          </v-btn>
        </div>
        <div class="text-center mt-3 caption">
          Don't have an account?
          <a
            class="primary--text font-weight-bold text-decoration-none"
            @click="$router.push('/register')"
          >
            Sign up
          </a>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        console.log(response)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
}
.or__divider--container {
  position: relative;
}
.or__divider--container::before {
  background: #596366;
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0;
  bottom: 0;
  top: 11px;
}
.or__divider--line {
  width: 50px;
  z-index: 23;
  position: relative;
}
</style>
