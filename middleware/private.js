export default function ({ store, redirect }) {
  const auth = store.getters['auth/getAuth']
  console.log('auth1', auth)
  console.log('auth2', auth.email)
  if (auth.email === undefined) {
    redirect('/')
  }
}
