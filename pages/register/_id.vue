<template>
  <div class="container">
    <v-card class="px-12 pb-12 pt-6 mx-auto" max-width="500">
      <div class="px-6 mx-6">
        <div class="text-center">
          <h1 class="font-weight-bold">Sign up</h1>
        </div>
        <div class="text-center caption pt-3">
          Already have an account?
          <a
            href="#"
            class="primary--text font-weight-bold text-decoration-none"
            @click="$router.push('/login')"
          >
            Sign in
          </a>
        </div>
        <v-form ref="form" v-model="valid">
          <div>
            <v-text-field
              v-model="name"
              color="primary"
              placeholder="Your Name"
              :rules="[required('name')]"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="email"
              color="primary"
              placeholder="Your Email Address"
              :rules="[required('email'), isValidEmail()]"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="password"
              color="primary"
              type="password"
              placeholder="Password"
              :rules="[required('password'), minLength('password', 5)]"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="confirm_password"
              color="primary"
              type="password"
              placeholder="Confirm Password"
              :rules="[
                required('confirm password'),
                password === confirm_password || 'Password must match',
              ]"
            ></v-text-field>
          </div>
          <div>
            <v-checkbox
              v-model="terms"
              :rules="[terms === true || 'You must agree to continue!']"
              label="I agree to the Terms and Conditions."
              class="terms-conditions"
            ></v-checkbox>
          </div>
          <div>
            <v-btn
              rounded
              color="primary"
              class="text-capitalize white--text mt-4"
              block
              depressed
              :disabled="!valid"
              :loading="loading"
              @click="register"
            >
              Get Started
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
import validations from '@/utils/validations'

export default {
  auth: false,
  data() {
    return {
      ...validations,
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      valid: true,
      loading: false,
      terms: '',
    }
  },
  methods: {
    async register() {
      try {
        const param = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm_password,
        }
        const response = await this.$clientRepository.AddClient(param)
        // login registered client
        try {
          const loginresponse = await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          console.log(loginresponse)
          this.$router.push('/')
        } catch (err) {
          console.log(err)
        }
        console.log('response', response)
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
.terms-conditions >>> label {
  font-size: 12px;
  font-weight: bold;
}
</style>
