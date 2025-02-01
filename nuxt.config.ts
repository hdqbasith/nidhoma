// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'nuxt-security',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    'nuxt-file-storage',
    'nuxt-auth-sanctum',
    '@nuxt/image',
  ],
  tailwindcss: {
    configPath: '~/assets/css'
  },
  css: ['~/packages/@core/base/design/index.ts'],
  ssr: false,
  runtimeConfig: {
    public: {
      // apiBase: process.env.API_URL || 'http://localhost:8000',
      apiBase: 'https://nidhoma.madrasahtbs.sch.id/jetstream',
      apiPrefix: '/api/v2'
    }
  },
  security: {
    enabled: true,
    nonce: true,
    headers: {
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: 'same-origin-allow-popups',
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "blob:" , "https://*", process.env.API_URL || 'http://127.0.0.1:*','http://localhost:8000'],
        'script-src': ["'self'", "'nonce-{{nonce}}'", "'strict-dynamic'"],
      },
    },
  },
  piniaPluginPersistedstate: {
    storage: 'localStorage',
    key: 'nidhoma-%id',
  },
  sanctum: {
    userStateKey: 'nidhoma',
    // baseUrl: 'http://localhost:8000/api/v2', // Laravel API
    baseUrl: 'https://nidhoma.madrasahtbs.sch.id/jetstream/api/v2', // Laravel API
    endpoints: {
      login: '/auth/login',
      user: '/user',
      logout: '/auth/logout',
    },
    redirect: {
      onAuthOnly: '/auth/login',
      onLogin: '/dashboard',
      onLogout: '/',
      onGuestOnly: '/auth/login',
    },
    redirectIfAuthenticated: true,
    logLevel: 3,
    mode: 'token',

  },
  shadcn:{
    componentDir:'packages/@core/ui-kit/shadcn-ui',
  },
  plugins:[
    '~/plugins/VuePdfEmbed.client.js',
    '~/plugins/vue-query.ts'
  ]
})