<template>
  <section
    id="hero"
    class="relative flex items-center justify-center min-h-dvh overflow-hidden"
    style="background: #141414;"
  >
    <div class="relative z-10 flex flex-col items-center text-center px-6 w-full">
      <!-- Eyebrow -->
      <p
        ref="eyebrowRef"
        class="font-body text-xs uppercase tracking-[0.3em] mb-8"
        style="color: rgba(255,255,255,0.25); opacity: 0; transform: translateY(20px);"
      >
        MOTION DESIGN STUDIO — EST. 2024
      </p>

      <h1
        class="font-display leading-none uppercase w-full mb-8"
        style="font-size: clamp(72px, 13vw, 190px); letter-spacing: 0.02em;"
        aria-label="WE MAKE BRANDS MOVE."
      >
        <span
          v-for="(word, i) in headlineWords"
          :key="i"
          class="headline-word-wrap"
          style="display: inline-block; overflow: hidden; vertical-align: top;"
        >
          <span
            ref="wordRefs"
            class="headline-word"
            style="display: inline-block; opacity: 0; transform: translateY(120px) skewY(8deg);"
            v-html="word"
          ></span>
        </span>
      </h1>

      <p
        ref="sublineRef"
        class="font-body text-base leading-relaxed max-w-120 mb-12"
        style="color: rgba(255,255,255,0.5); opacity: 0; transform: translateY(20px);"
      >
        We're a 12-person remote studio obsessed with the space between stillness and movement.
      </p>

      <!-- CTA -->
      <div ref="ctaWrapRef" style="opacity: 0; transform: translateY(20px);">
        <button
          ref="ctaButtonRef"
          class="magnetic font-body text-sm uppercase tracking-[0.2em] px-10 py-4 border"
          style="border-color: var(--accent); color: var(--accent); background: transparent;"
          @click="scrollToWork"
        >
          SEE OUR WORK
        </button>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      ref="scrollIndicatorRef"
      class="absolute bottom-10 left-1/2 flex flex-col items-center gap-3"
      style="opacity: 0; transform: translateX(-50%);"
    >
      <div class="scroll-line" style="width: 2px; height: 40px; background: var(--accent);"></div>
      <span class="font-body" style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.3);">SCROLL</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMagneticButton } from '~/composables/useMagneticButton'

const eyebrowRef = ref<HTMLElement | null>(null)
const wordRefs = ref<HTMLElement[]>([])
const sublineRef = ref<HTMLElement | null>(null)
const ctaWrapRef = ref<HTMLElement | null>(null)
const ctaButtonRef = ref<HTMLElement | null>(null)
const scrollIndicatorRef = ref<HTMLElement | null>(null)

// "WE  MAKE  BRANDS  MOVE." — last word contains accent-colored period
const headlineWords = [
  'WE\u00A0',
  'MAKE\u00A0',
  'BRANDS\u00A0',
  `MOVE<span style="color:var(--accent);">.</span>`,
]

useMagneticButton(ctaButtonRef, 80, 20)

async function scrollToWork() {
  const el = document.getElementById('work')
  if (el) (window as any).__lenis?.scrollTo(el, { duration: 1.4, offset: -80 })
}

onMounted(async () => {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')

  // Collect word elements after render
  const words = document.querySelectorAll('.headline-word')

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(eyebrowRef.value, { y: 0, opacity: 1, duration: 0.8 }, 0.2)
  tl.to(words, { y: 0, opacity: 1, skewY: 0, duration: 0.9, stagger: 0.08 }, 0.5)
  tl.to(sublineRef.value, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
  tl.to(ctaWrapRef.value, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
  tl.to(scrollIndicatorRef.value, { opacity: 1, duration: 0.5 }, '-=0.3')
})
</script>
