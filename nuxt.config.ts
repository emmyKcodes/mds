import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      title: 'KINET — Motion Design Studio',
      meta: [
        { name: 'description', content: 'We make brands move.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'lenis'],
    },
  },

  modules: ['@nuxt/icon'],

  build: {
    transpile: ['gsap'],
  },
})
