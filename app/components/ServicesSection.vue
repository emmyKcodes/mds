<template>
  <section
    id="services"
    class="relative py-40"
    style="background: #141414;"
  >
    <div class="px-10 md:px-16 mb-16">
      <p class="section-label mb-10">004 — SERVICES</p>
      <h2
        ref="headlineRef"
        class="font-display leading-none uppercase text-white"
        style="font-size: clamp(64px, 10vw, 140px);"
      >
        WHAT<br/>WE DO
      </h2>
    </div>

    <!-- Service Rows -->
    <div ref="rowsRef">
      <div
        v-for="(service, i) in services"
        :key="service.id"
        class="service-row opacity-0"
        style="padding-left: 40px; padding-right: 40px;"
      >
        <button
          class="w-full flex items-center justify-between py-8 text-left"
          style="background: none; border: none; cursor: none;"
          @click="toggleService(i)"
        >
          <div class="flex items-center gap-6 md:gap-10">
            <span
              class="service-num font-display leading-none"
              :style="`font-size: clamp(56px, 7vw, 110px); color: rgba(255,255,255,0.1); transition: color 0.3s;`"
            >
              {{ service.id }}
            </span>
            <span
              class="service-title font-display uppercase text-white leading-none"
              :style="`font-size: clamp(28px, 4vw, 64px); transition: color 0.3s;`"
            >
              {{ service.name }}
            </span>
          </div>
          <span
            class="service-toggle font-display text-white/30"
            style="font-size: 36px; display: inline-block; transition: transform 0.3s; flex-shrink: 0;"
          >+</span>
        </button>

        <!-- Expandable Content -->
        <div class="service-content" style="height: 0; overflow: hidden;">
          <div style="padding-bottom: 32px; padding-left: 0;">
            <p class="font-body mb-4" style="font-size: 18px; color: rgba(255,255,255,0.75); max-width: 600px; line-height: 1.75;">
              {{ service.description }}
            </p>
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <span
                v-for="tag in service.tags"
                :key="tag"
                class="font-body text-xs uppercase tracking-[0.15em]"
                style="color: rgba(255,255,255,0.35);"
              >{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { splitText } from '../composables/useSplitText'

const headlineRef = ref<HTMLElement | null>(null)
const rowsRef = ref<HTMLElement | null>(null)
let activeIndex = -1

const services = [
  {
    id: '01',
    name: 'Motion Design',
    description: 'From title sequences to UI micro-animations — we make things move with intention.',
    tags: ['After Effects', '·', 'Cinema 4D', '·', 'Lottie'],
  },
  {
    id: '02',
    name: 'Brand Identity',
    description: 'Visual systems that have a pulse. Logos, type, color, motion guidelines.',
    tags: ['Strategy', '·', 'Design', '·', 'Guidelines'],
  },
  {
    id: '03',
    name: 'Interactive Web',
    description: 'Sites that behave like experiences. Built to move, built to perform.',
    tags: ['Nuxt', '·', 'GSAP', '·', 'Three.js'],
  },
  {
    id: '04',
    name: '3D & VFX',
    description: 'Product renders, brand worlds, visual effects for film and digital.',
    tags: ['Cinema 4D', '·', 'Houdini', '·', 'Unreal'],
  },
]

async function closeRow(row: HTMLElement, gsap: any) {
  const content = row.querySelector('.service-content') as HTMLElement
  const toggle = row.querySelector('.service-toggle') as HTMLElement
  const num = row.querySelector('.service-num') as HTMLElement
  const title = row.querySelector('.service-title') as HTMLElement
  gsap.to(content, { height: 0, duration: 0.45, ease: 'power3.inOut' })
  gsap.to(toggle, { rotation: 0, duration: 0.3, ease: 'power2.out' })
  gsap.to(row, { backgroundColor: 'transparent', duration: 0.3 })
  gsap.to([num], { color: 'rgba(255,255,255,0.1)', duration: 0.3 })
  gsap.to([title], { color: '#ffffff', duration: 0.3 })
}

async function openRow(row: HTMLElement, gsap: any) {
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
  const content = row.querySelector('.service-content') as HTMLElement
  const toggle = row.querySelector('.service-toggle') as HTMLElement
  const num = row.querySelector('.service-num') as HTMLElement
  const title = row.querySelector('.service-title') as HTMLElement
  const innerHeight = (content.firstElementChild as HTMLElement)?.scrollHeight ?? 120
  gsap.to(content, { height: innerHeight, duration: 0.5, ease: 'power3.inOut' })
  gsap.to(toggle, { rotation: 45, duration: 0.3, ease: 'power2.out' })
  gsap.to(row, { backgroundColor: `${accent}18`, duration: 0.3 })
  gsap.to([num, title], { color: accent, duration: 0.3 })
}

async function toggleService(index: number) {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')
  const rows = rowsRef.value?.querySelectorAll('.service-row')
  if (!rows) return

  if (activeIndex >= 0 && activeIndex !== index) {
    await closeRow(rows[activeIndex] as HTMLElement, gsap)
  }

  if (activeIndex === index) {
    await closeRow(rows[index] as HTMLElement, gsap)
    activeIndex = -1
  } else {
    await openRow(rows[index] as HTMLElement, gsap)
    activeIndex = index
  }
}

onMounted(async () => {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  if (headlineRef.value) {
    const split = splitText(headlineRef.value, 'chars')
    if (split?.chars.length) {
      gsap.fromTo(
        split.chars,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.025,
          scrollTrigger: { trigger: headlineRef.value, start: 'top 80%' },
        }
      )
    }
  }

  const rows = rowsRef.value?.querySelectorAll('.service-row')
  if (rows?.length) {
    gsap.fromTo(
      rows,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: rowsRef.value, start: 'top 75%' },
      }
    )
  }
})
</script>
