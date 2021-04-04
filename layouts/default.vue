<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="$strapi.user !== null"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      app
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
    >
      <v-app-bar-nav-icon v-if="$strapi.user !== null" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="$strapi.user === null">
        <NuxtLink
          class="border-r px-3"
          to="/login"
        >
          Login
        </NuxtLink>
        <NuxtLink
          class="border-r px-3"
          to="/signup"
        >
          Signup
        </NuxtLink>
      </div>
      <div v-if="$strapi.user !== null">
        <v-btn icon @click="logout">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container style="height: 100%;">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <Notifier />
  </v-app>
</template>

<script>
import Notifier from '~/components/notifier'

export default {
  components: {
    Notifier
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Blog',
          to: '/blog'
        }
      ],
      miniVariant: false,
      title: 'Hello Word'
    }
  },
  methods: {
    async logout () {
      await this.$strapi.logout()
      this.$nuxt.$router.push('/')
    }
  }
}
</script>
