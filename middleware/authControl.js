export default function (data) {
  if (!data.store?.state.auth?.loggedIn) {
    return data.redirect('/auth/login')
  }
}
