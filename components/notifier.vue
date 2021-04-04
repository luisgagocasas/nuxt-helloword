<template>
  <v-snackbar
    v-model="show"
    :color="color"
    right
    bottom
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      color: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notifier/showMessage') {
        this.message = state.notifier.content
        this.color = state.notifier.color
        this.show = true
      }
    })
  }
}
</script>
