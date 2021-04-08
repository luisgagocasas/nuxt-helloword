<template>
  <v-container fill-height class="text-center" style="width: 50%;">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="text-center">
        <h1>Login</h1>
        <v-card light="light">
          <v-card-text>
            <div class="subheading">
              <p>
                Log in to your customer portal
              </p>
            </div>
            <v-form @submit="loginUser">
              <v-text-field
                v-model="identifier"
                light="light"
                prepend-icon="mdi-email"
                label="Email"
              />
              <v-text-field
                v-model="password"
                light="light"
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
              />
              <v-btn
                block="block"
                :disabled="identifier === '' || password === ''"
                color="teal"
                class="white--text"
                type="submit"
              >
                Sign in
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  middleware: 'authenticated',
  data () {
    return {
      identifier: '',
      password: ''
    }
  },
  methods: {
    async loginUser (e) {
      e.preventDefault()
      try {
        const user = await this.$strapi.login({
          identifier: this.identifier,
          password: this.password
        })
        this.$notifier.showMessage({ content: 'Hello, Welcome!', color: 'success' })
        this.$store.dispatch('auth/loadAuth')
        if (user !== null) {
          this.$nuxt.$router.push('/blog')
        }
      } catch {
        this.$notifier.showMessage({ content: 'Error in login credentials', color: 'error' })
      }
    }
  }
}
</script>
