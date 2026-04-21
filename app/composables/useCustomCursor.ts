import { onMounted, onUnmounted } from 'vue'

export function useCustomCursor() {
  if (!import.meta.client) return

  onMounted(async () => {
    const { gsap } = await import('gsap')
    const cursor = document.querySelector('.cursor-dot') as HTMLElement
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.2, ease: 'power2.out' })
    }

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: 'power2.out' })
    }

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .magnetic')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    attachHoverListeners()

    // Re-attach on DOM changes
    const observer = new MutationObserver(attachHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    onUnmounted(() => {
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
    })
  })
}
