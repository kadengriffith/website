// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true, telemetry: false },
  telemetry: { enabled: false },
  css: ['~/assets/css/main.css'],
  srcDir: 'src',
  routeRules: {
    '/': { prerender: true },
  },
  modules: ['@vueuse/nuxt', '@nuxt/ui-pro']
})