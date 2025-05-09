// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/content',
    '@pinia/nuxt'
  ],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL || 'http://localhost:8000'
    }
  }
})