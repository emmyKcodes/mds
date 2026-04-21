import { onMounted, onUnmounted, type Ref } from 'vue'

export function useMagneticButton(elRef: Ref<HTMLElement | null>, radius = 80, strength = 20) {
  if (!import.meta.client) return

  onMounted(async () => {
    const { gsap } = await import('gsap')
    const el = elRef.value
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength
        gsap.to(el, {
          x: (dx / dist) * pull,
          y: (dy / dist) * pull,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' })
      }
    }

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    }

    window.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    onUnmounted(() => {
      window.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    })
  })
}
