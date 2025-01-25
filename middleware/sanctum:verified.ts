export default defineNuxtRouteMiddleware((to, from) => {
  const sanctumConfig = useSanctumConfig()

  const { isAuthenticated, user } = useSanctumAuth<User>()
  if (!isAuthenticated.value) {
    if (sanctumConfig.redirect.onAuthOnly === false) {
      return createError({
        statusCode: 409,
        message: 'You must verify your email to access this page',
        fatal: true,
      })
    }
    return navigateTo(sanctumConfig.redirect.onAuthOnly)
  }
  
  if (user.value?.email_verified_at !== null) {
    console.log(user.value?.email_verified_at == null);
    console.log(user.value?.email_verified_at === null);
    return
  }

  // return useNuxtApp().runWithContext(() => {
    return navigateTo('/auth/verify-email')
  // });
  // return navigateTo('')
})
