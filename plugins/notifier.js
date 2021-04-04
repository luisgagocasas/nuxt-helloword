export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ content = '', color = '' }) {
      store.commit('notifier/showMessage', { content, color })
    }
  })
}
