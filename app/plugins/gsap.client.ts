import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (import.meta.client) {
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')

    gsap.registerPlugin(ScrollTrigger)

    nuxtApp.provide('gsap', gsap)
    nuxtApp.provide('ScrollTrigger', ScrollTrigger)
  }
})
