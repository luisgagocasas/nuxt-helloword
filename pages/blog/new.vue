<template>
  <div>
    <v-breadcrumbs :large="true">
      <v-breadcrumbs-divider />
      <v-breadcrumbs-item>
        <nuxt-link to="/blog">
          Blog
        </nuxt-link>
      </v-breadcrumbs-item>
      <v-icon
        :small="true"
      >
        mdi-forward
      </v-icon>
      <v-breadcrumbs-item :disabled="true">
        new post
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card max-width="90%" class="mx-auto" light="light">
      <v-form @submit="createPost">
        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
            <v-col cols="12">
              <v-text-field
                v-model="title"
                light="light"
                label="Title"
                :rules="ruleTitle"
              />
            </v-col>
          </v-row>
          <v-row
            align="center"
            class="mx-0"
          >
            <v-col cols="6">
              <v-textarea
                v-model="summary"
                rows="1"
                row-height="3"
                light="light"
                label="Summary"
                auto-grow
                :rules="ruleSummary"
              />
            </v-col>
            <v-col cols="6">
              <v-file-input
                v-model="image"
                prepend-icon="mdi-camera"
                label="File image"
                accept="image/png, image/jpeg, image/bmp"
                show-size
                dense
              />
            </v-col>
          </v-row>
          <v-row
            align="center"
            class="mx-0"
          >
            <v-textarea
              v-model="content"
              light="light"
              label="Content"
            />
          </v-row>
          <v-card-actions class="pt-0">
            <v-btn
              block="block"
              :disabled="title === '' || summary === '' || content === ''"
              color="teal"
              class="white--text"
              type="submit"
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  middleware: 'private',
  data () {
    return {
      title: '',
      summary: '',
      image: [],
      content: '',
      users_permissions_user: this.$strapi.user,
      ruleTitle: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters'
      ],
      ruleSummary: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
        value => (value && value.length <= 280) || 'Max 280 characters'
      ]
    }
  },
  methods: {
    async createPost (e) {
      e.preventDefault()

      try {
        const blogs = await this.$strapi.$blogs.create(
          {
            title: this.title,
            summary: this.summary,
            content: this.content,
            published_at: null
          }
        )
        this.$notifier.showMessage({ content: 'Good!', color: 'success' })
        this.uploadFile(blogs.id, this.image)

        if (blogs !== null) {
          this.$nuxt.$router.push('/blog')
        }
      } catch (e) {
        this.$notifier.showMessage({ content: 'Error', color: 'error' })
      }
    },
    async uploadFile (idBlog, image) {
      // try {
      //   const attachment = await this.$strapi.$http.$post('/upload', {
      //     files: image,
      //     ref: 'blog',
      //     refId: idBlog,
      //     field: 'image'
      //   }, { headers: { 'Content-Type': 'multipart/form-data' } })
      //   // const attachment = await strapi.plugins.upload.services.upload.upload({
      //   //   data: {
      //   //     refId: idBlog,
      //   //     ref: 'blog',
      //   //     field: 'image'
      //   //   },
      //   //   files: image
      //   // })
      //   console.log('attachment', attachment)
      // } catch (e) {
      //   console.log('e', e)
      // }

      try {
        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'blog')
        formData.append('refId', idBlog)
        formData.append('field', 'image')
        await axios.post('http://localhost:1337/upload', formData)
      } catch { }
    }
  }
}
</script>
