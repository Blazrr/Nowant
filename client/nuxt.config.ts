export default defineNuxtConfig({
  modules: ['nuxt-electron', '@pinia/nuxt', '@nuxt/ui'],
  electron: {
    build: [
      {
        entry: 'electron/main.ts',
      },
    ],
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  compatibilityDate: '2024-10-05',
})