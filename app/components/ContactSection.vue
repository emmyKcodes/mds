<template>
  <section
    id="contact"
    class="relative py-40 px-10 md:px-20"
    style="background: #1e1e1e;"
  >
    <div class="flex flex-col items-center text-center">
      <h2
        ref="headlineRef"
        class="font-display leading-none uppercase text-white mb-12"
        style="font-size: clamp(100px, 18vw, 260px);"
      >
        <span class="block overflow-hidden"><span class="headline-line block opacity-0" style="transform: translateY(100px) skewY(5deg);">LET'S</span></span>
        <span class="block overflow-hidden"><span class="headline-line block opacity-0" style="transform: translateY(100px) skewY(5deg);">TALK</span></span>
      </h2>

      <div ref="emailRef" class="mb-16 opacity-0">
        <a
          href="mailto:hello@kinet.studio"
          class="font-body relative group"
          style="font-size: 24px; color: var(--accent); text-decoration: none;"
          @click.prevent="copyEmail"
        >
          <span ref="emailTextRef">hello@kinet.studio</span>
          <span
            class="absolute bottom-0 left-0 h-px"
            ref="emailUnderlineRef"
            style="background: var(--accent); width: 0;"
          ></span>
        </a>
      </div>

      <form
        ref="formRef"
        class="w-full max-w-140 text-left"
        @submit.prevent="handleSubmit"
        novalidate
      >
        <div class="form-group opacity-0 mb-6">
          <input
            type="text"
            placeholder="YOUR NAME"
            class="form-field"
            v-model="formData.name"
          />
        </div>
        <div class="form-group opacity-0 mb-6">
          <input
            type="email"
            placeholder="YOUR EMAIL"
            class="form-field"
            v-model="formData.email"
          />
        </div>
        <div class="form-group opacity-0 mb-10">
          <textarea
            placeholder="TELL US ABOUT YOUR PROJECT"
            class="form-field"
            rows="3"
            style="resize: none;"
            v-model="formData.message"
          ></textarea>
        </div>
        <div class="form-group opacity-0 flex justify-center">
          <button
            ref="submitBtnRef"
            type="submit"
            class="magnetic font-body font-semibold text-sm uppercase tracking-[0.2em] px-12 py-5"
            style="background: var(--accent); color: #141414; border: none; border-radius: 0;"
          >
            {{ submitted ? 'SENT ✓' : 'SEND IT →' }}
          </button>
        </div>
      </form>

      <!-- Footer -->
      <p class="mt-24 font-body text-xs" style="color: rgba(255,255,255,0.15);">
        © 2026 KINET STUDIO — ALL RIGHTS RESERVED
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useMagneticButton } from '~/composables/useMagneticButton'

const headlineRef = ref<HTMLElement | null>(null)
const emailRef = ref<HTMLElement | null>(null)
const emailTextRef = ref<HTMLElement | null>(null)
const emailUnderlineRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const submitBtnRef = ref<HTMLElement | null>(null)
const submitted = ref(false)

const formData = reactive({ name: '', email: '', message: '' })

useMagneticButton(submitBtnRef, 80, 20)

async function copyEmail() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText('hello@kinet.studio')
    const el = emailTextRef.value
    if (el) {
      const orig = el.textContent
      el.textContent = 'COPIED ✓'
      setTimeout(() => { if (el) el.textContent = orig }, 2000)
    }
  } catch {}
}

async function handleSubmit() {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')
  submitted.value = true
  gsap.to(submitBtnRef.value, {
    backgroundColor: '#B8FF00',
    duration: 0.3,
  })
}

onMounted(async () => {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  // Headline lines
  const lines = headlineRef.value?.querySelectorAll('.headline-line')
  if (lines) {
    gsap.to(lines, {
      y: 0,
      opacity: 1,
      skewY: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: headlineRef.value,
        start: 'top 75%',
      },
    })
  }

  ScrollTrigger.create({
    trigger: emailRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(emailRef.value, { opacity: 1, duration: 0.6 })
      gsap.to(emailUnderlineRef.value, { width: '100%', duration: 0.7, ease: 'power3.out', delay: 0.3 })
    },
  })

  const formGroups = formRef.value?.querySelectorAll('.form-group')
  if (formGroups) {
    gsap.fromTo(
      formGroups,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: formRef.value,
          start: 'top 80%',
        },
      }
    )
  }
})
</script>
