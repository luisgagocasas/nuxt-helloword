<template>
  <v-container fill-height class="text-center" style="width: 50%;">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="text-center">
        <h1>Signup</h1>
        <v-card light="light">
          <v-card-text>
            <div class="subheading">
              <p>
                Signup in to your customer portal
              </p>
            </div>
            <v-form @submit="createUser">
              <v-text-field
                v-model="email"
                light="light"
                prepend-icon="mdi-email"
                label="Email"
              />
              <v-text-field
                v-model="username"
                light="light"
                prepend-icon="mdi-account"
                label="Username"
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
                :disabled="email === '' || password === '' || username === ''"
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
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    async createUser (e) {
      e.preventDefault()
      try {
        const newUser = await this.$strapi.register({
          email: this.email,
          username: this.username,
          password: this.password
        })
        if (newUser !== null) {
          this.$nuxt.$router.push('/blog')
          this.$notifier.showMessage({ content: 'You have to confirm your email address.', color: 'success' })
        }
      } catch {
        this.$notifier.showMessage({ content: 'Error in signup credentials', color: 'error' })
      }
    }
  }
}
</script>
