<template>
  <div>
    <!-- Custom cursor -->
    <div class="cursor-dot" ref="cursorRef"></div>

    <!-- Grain overlay -->
    <div class="grain-overlay"></div>

    <!-- Navigation -->
    <AppNav :active-section="activeSection" />

    <!-- Sections -->
    <HeroSection />
    <WorkSection />
    <AboutSection />
    <ServicesSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAccentColor } from '~/composables/useAccentColor'
import { useCustomCursor } from '~/composables/useCustomCursor'

const cursorRef = ref<HTMLElement | null>(null)
const activeSection = ref('hero')
const { setAccent } = useAccentColor()

// Init cursor tracking
useCustomCursor()

onMounted(async () => {
  if (!import.meta.client) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  const Lenis = (await import('lenis')).default

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  })

  
  ;(window as any).__lenis = lenis

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  lenis.on('scroll', ScrollTrigger.update)

  const sections: Array<{ id: string; name: string }> = [
    { id: 'hero', name: 'hero' },
    { id: 'work', name: 'work' },
    { id: 'about', name: 'about' },
    { id: 'services', name: 'services' },
    { id: 'contact', name: 'contact' },
  ]

  sections.forEach(({ id, name }) => {
    const el = document.getElementById(id)
    if (!el) return

    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setAccent(name)
        activeSection.value = name
      },
      onEnterBack: () => {
        setAccent(name)
        activeSection.value = name
      },
    })
  })

  onUnmounted(() => {
    lenis.destroy()
    gsap.ticker.remove(() => {})
    ScrollTrigger.getAll().forEach((t) => t.kill())
  })
})
</script>
