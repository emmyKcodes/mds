<template>
  <section
    id="about"
    class="relative py-40"
    style="background: #141414;"
  >
    <div class="px-10 md:px-16">
      <p class="section-label mb-16">003 — ABOUT</p>

      <div ref="statsRef" class="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat-item opacity-0"
          style="transform: translateY(40px);"
        >
          <div
            class="font-display leading-none text-white"
            style="font-size: clamp(56px, 8vw, 120px);"
          >
            {{ stat.value }}
          </div>
          <div class="font-body text-xs uppercase tracking-[0.2em] mt-2" style="color: rgba(255,255,255,0.4);">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <div class="w-full mb-20" style="height: 1px; background: rgba(255,255,255,0.08);"></div>

      <div class="relative overflow-visible">
        <div
          aria-hidden="true"
          class="absolute top-1/2 left-1/2 font-display leading-none uppercase pointer-events-none select-none whitespace-nowrap"
          style="font-size: clamp(120px, 20vw, 280px); color: rgba(255,255,255,0.04); z-index: 0; transform: translate(-50%, -50%);"
        >
          KINET
        </div>

        <div class="relative z-10 max-w-200">
          <p
            ref="manifestoRef"
            class="font-body leading-relaxed"
            style="font-size: clamp(18px, 2vw, 24px); color: rgba(255,255,255,0.85);"
          >
            We don't make ads. We make moments that refuse to be ignored. KINET is a
            <em>motion-first</em> creative studio
            <strong class="manifesto-accent font-normal" style="color: var(--accent);">obsessed</strong>
            with the space between stillness and movement.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const statsRef = ref<HTMLElement | null>(null)
const manifestoRef = ref<HTMLElement | null>(null)

const stats = [
  { value: 'EST. 2017', label: 'Founded' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '12', label: 'Humans' },
  { value: '4', label: 'Continents' },
]

onMounted(async () => {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  const statItems = statsRef.value?.querySelectorAll('.stat-item')
  if (statItems?.length) {
    gsap.to(statItems, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: statsRef.value, start: 'top 75%' },
    })
  }

  if (manifestoRef.value) {
    gsap.fromTo(
      manifestoRef.value,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: manifestoRef.value, start: 'top 80%' },
      }
    )
  }
})
</script>
