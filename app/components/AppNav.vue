<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-10 py-6 transition-none"
    style="background: transparent;"
  >
    <button
      class="font-display text-white text-3xl tracking-wider hover:opacity-80 transition-opacity"
      @click="scrollToTop"
    >
      KINET
    </button>

    <ul class="flex items-center gap-10 list-none">
      <li v-for="link in links" :key="link.id">
        <button
          :ref="(el) => setLinkRef(el as HTMLElement, link.id)"
          class="nav-link font-body text-xs uppercase tracking-[0.2em] text-white/50 transition-colors duration-200"
          :class="{ 'active-nav': activeSection === link.id }"
          @click="scrollToSection(link.id)"
        >
          {{ link.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ activeSection: string }>()

const navRef = ref<HTMLElement | null>(null)
const links = [
  { id: 'work', label: 'WORK' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
]
const linkRefs: Record<string, HTMLElement> = {}

function setLinkRef(el: HTMLElement | null, id: string) {
  if (el) linkRefs[id] = el
}

async function scrollToTop() {
  if (!import.meta.client) return
  const { default: Lenis } = await import('lenis')
  ;(window as any).__lenis?.scrollTo(0, { duration: 1.4 })
}

async function scrollToSection(id: string) {
  if (!import.meta.client) return
  const el = document.getElementById(id)
  if (el) {
    ;(window as any).__lenis?.scrollTo(el, { duration: 1.4, offset: -80 })
  }
}

onMounted(async () => {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  ScrollTrigger.create({
    start: 80,
    onEnter: () => navRef.value?.classList.add('scrolled'),
    onLeaveBack: () => navRef.value?.classList.remove('scrolled'),
  })
})
</script>

<style scoped>
.active-nav {
  color: var(--accent) !important;
}

nav.scrolled {
  background: rgba(20, 20, 20, 0.8) !important;
  backdrop-filter: blur(12px);
}
</style>
