<template>
  <section
    id="work"
    class="relative py-40"
    style="background: #141414;"
  >
    <div class="px-10 md:px-16 mb-16">
      <p class="section-label mb-6">002 — SELECTED WORK</p>
      <h2
        ref="headlineRef"
        class="font-display leading-none uppercase text-white"
        style="font-size: clamp(64px, 10vw, 140px);"
      >
        SELECTED<br/>WORK
      </h2>
    </div>

    <div ref="cardsRef">
      <div
        v-for="(project, i) in projects"
        :key="project.id"
        class="work-card opacity-0"
        style="border-top: 1px solid rgba(255,255,255,0.08);"
      >
        <!-- Clickable Row -->
        <button
          class="w-full text-left px-10 md:px-16 py-10 flex items-center justify-between gap-8"
          style="background: none; border: none; cursor: pointer;"
          @click="toggleProject(i)"
          @mouseenter="onRowHover($event.currentTarget as HTMLElement, true)"
          @mouseleave="onRowHover($event.currentTarget as HTMLElement, false)"
        >
          <div class="flex items-center gap-8 md:gap-12 min-w-0">
            <span
              class="project-num font-display shrink-0"
              style="font-size: clamp(36px, 4vw, 56px); color: rgba(255,255,255,0.1); line-height: 1;"
            >{{ project.id }}</span>
            <div class="min-w-0">
              <div
                class="project-name font-display leading-none uppercase text-white"
                style="font-size: clamp(28px, 4vw, 60px);"
              >{{ project.name }}</div>
              <div
                class="font-body text-xs uppercase tracking-[0.2em] mt-2"
                style="color: rgba(255,255,255,0.35);"
              >{{ project.category }} — {{ project.year }}</div>
            </div>
          </div>

          <span
            class="project-arrow font-body shrink-0"
            :style="{
              color: activeProject === i ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
              fontSize: '1.4rem',
              display: 'block',
              transform: activeProject === i ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s cubic-bezier(0.76,0,0.24,1), color 0.25s',
            }"
          >→</span>
        </button>

        <!-- Expandable Panel -->
        <div
          :ref="el => { if (el) panelRefs[i] = el as HTMLElement }"
          style="overflow: hidden; height: 0;"
        >
          <div :ref="el => { if (el) panelInnerRefs[i] = el as HTMLElement }" class="px-10 md:px-16 pb-16">
            <div class="flex flex-col md:flex-row gap-12 md:gap-20 pt-4">

              <!-- SVG Illustration -->
              <div class="shrink-0" style="width: 100%; max-width: 320px;">
                <div
                  class="project-svg-wrap"
                  style="width: 100%; aspect-ratio: 4/3; border-radius: 4px; overflow: hidden; position: relative;"
                  :style="{ background: project.svgBg }"
                >
                  <component :is="project.svgComponent" />
                </div>
              </div>

              <!-- Text -->
              <div class="flex flex-col justify-between gap-10 flex-1">
                <p
                  class="font-body leading-relaxed"
                  style="font-size: clamp(15px, 1.5vw, 18px); color: rgba(255,255,255,0.6); max-width: 520px;"
                >{{ project.description }}</p>

                <div class="flex flex-col gap-6">
                  <!-- Tags -->
                  <div>
                    <p class="font-body text-xs uppercase tracking-[0.2em] mb-3" style="color: rgba(255,255,255,0.22);">Deliverables</p>
                    <div class="flex gap-2 flex-wrap">
                      <span
                        v-for="tag in project.deliverables" :key="tag"
                        class="font-body text-[10px] uppercase tracking-[0.15em] px-3 py-1"
                        style="border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; color: rgba(255,255,255,0.38);"
                      >{{ tag }}</span>
                    </div>
                  </div>

                  <!-- Outcome -->
                  <div>
                    <p class="font-body text-xs uppercase tracking-[0.2em] mb-1" style="color: rgba(255,255,255,0.22);">Outcome</p>
                    <p class="font-display uppercase" :style="{ fontSize: 'clamp(32px, 3vw, 48px)', color: 'var(--accent)' }">
                      {{ project.outcome }}
                    </p>
                    <p class="font-body text-xs uppercase tracking-[0.15em] mt-1" style="color: rgba(255,255,255,0.28);">{{ project.outcomeLabel }}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.08);"/>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineComponent, h } from 'vue'
import { splitText } from '../composables/useSplitText'

const headlineRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)
const panelRefs = ref<HTMLElement[]>([])
const panelInnerRefs = ref<HTMLElement[]>([])
const activeProject = ref<number | null>(null)


const SvgVanta = defineComponent({ render: () => h('svg', {
  viewBox: '0 0 320 240', xmlns: 'http://www.w3.org/2000/svg',
  style: 'width:100%;height:100%;position:absolute;inset:0;',
}, [
  h('defs', {}, [
    h('linearGradient', { id: 'vg', x1:'0', y1:'0', x2:'0', y2:'1' }, [
      h('stop', { offset:'0%', 'stop-color':'#7B2FFF', 'stop-opacity':'0.5' }),
      h('stop', { offset:'100%', 'stop-color':'#7B2FFF', 'stop-opacity':'0' }),
    ]),
  ]),
  // Grid
  ...[0,1,2,3,4,5].map(n => h('line', { x1: n*64, y1:0, x2: n*64, y2:240, stroke:'rgba(255,255,255,0.05)', 'stroke-width':'1' })),
  ...[0,1,2,3].map(n => h('line', { x1:0, y1: n*60+30, x2:320, y2: n*60+30, stroke:'rgba(255,255,255,0.05)', 'stroke-width':'1' })),
  // Area
  h('polygon', { points:'0,200 55,178 105,188 160,128 210,138 265,82 320,60 320,240 0,240', fill:'url(#vg)' }),
  // Line
  h('polyline', { points:'0,200 55,178 105,188 160,128 210,138 265,82 320,60', fill:'none', stroke:'#7B2FFF', 'stroke-width':'2.5', 'stroke-linecap':'round', 'stroke-linejoin':'round' }),
  // Peak dot
  h('circle', { cx:265, cy:82, r:5, fill:'#7B2FFF' }),
  h('circle', { cx:265, cy:82, r:10, fill:'none', stroke:'#7B2FFF', 'stroke-width':'1', opacity:'0.4' }),
  h('text', { x:272, y:76, fill:'#7B2FFF', 'font-size':'10', 'font-family':'monospace' }, '+218%'),
  // Watermark
  h('text', { x:16, y:38, fill:'rgba(255,255,255,0.06)', 'font-size':'30', 'font-family':'sans-serif', 'font-weight':'700', 'letter-spacing':'4' }, 'VANTA'),
]) })

const SvgAether = defineComponent({ render: () => h('svg', {
  viewBox: '0 0 320 240', xmlns: 'http://www.w3.org/2000/svg',
  style: 'width:100%;height:100%;position:absolute;inset:0;',
}, [
  h('defs', {}, [
    h('radialGradient', { id: 'ag', cx:'50%', cy:'50%', r:'50%' }, [
      h('stop', { offset:'0%', 'stop-color':'#00E5FF', 'stop-opacity':'0.25' }),
      h('stop', { offset:'100%', 'stop-color':'#00E5FF', 'stop-opacity':'0' }),
    ]),
  ]),
  h('ellipse', { cx:160, cy:120, rx:110, ry:110, fill:'url(#ag)' }),
  ...[110,80,52,28].map((r, idx) => h('circle', {
    cx:160, cy:120, r, fill:'none', stroke:'#00E5FF',
    'stroke-width': idx === 3 ? '1.5' : '0.75',
    opacity: 0.12 + idx * 0.1,
    'stroke-dasharray': idx % 2 ? '4 6' : 'none',
  })),
  h('circle', { cx:160, cy:120, r:6, fill:'#00E5FF' }),
  h('circle', { cx:254, cy:82, r:4, fill:'#00E5FF', opacity:'0.7' }),
  h('line', { x1:160, y1:10, x2:160, y2:230, stroke:'rgba(0,229,255,0.08)', 'stroke-width':'1' }),
  h('line', { x1:30, y1:120, x2:290, y2:120, stroke:'rgba(0,229,255,0.08)', 'stroke-width':'1' }),
  h('text', { x:168, y:108, fill:'#00E5FF', 'font-size':'9', 'font-family':'monospace', opacity:'0.7' }, 'NODE 01'),
  h('text', { x:16, y:38, fill:'rgba(255,255,255,0.06)', 'font-size':'28', 'font-family':'sans-serif', 'font-weight':'700', 'letter-spacing':'3' }, 'AETHER'),
]) })

const SvgNoble = defineComponent({ render: () => h('svg', {
  viewBox: '0 0 320 240', xmlns: 'http://www.w3.org/2000/svg',
  style: 'width:100%;height:100%;position:absolute;inset:0;',
}, [
  h('defs', {}, [
    h('linearGradient', { id:'ng', x1:'0', y1:'0', x2:'1', y2:'1' }, [
      h('stop', { offset:'0%', 'stop-color':'#c8860a' }),
      h('stop', { offset:'100%', 'stop-color':'#7a4d00' }),
    ]),
  ]),
  h('rect', { x:110, y:80, width:100, height:110, rx:8, fill:'url(#ng)', opacity:'0.85' }),
  h('path', { d:'M210,105 Q244,105 244,138 Q244,168 210,168', fill:'none', stroke:'#c8860a', 'stroke-width':'10', 'stroke-linecap':'round', opacity:'0.65' }),
  h('ellipse', { cx:160, cy:196, rx:62, ry:9, fill:'rgba(200,134,10,0.25)' }),
  h('path', { d:'M140,78 Q144,60 140,44', fill:'none', stroke:'rgba(255,255,255,0.22)', 'stroke-width':'2', 'stroke-linecap':'round' }),
  h('path', { d:'M160,72 Q164,54 160,38', fill:'none', stroke:'rgba(255,255,255,0.18)', 'stroke-width':'2', 'stroke-linecap':'round' }),
  h('path', { d:'M180,78 Q184,60 180,44', fill:'none', stroke:'rgba(255,255,255,0.14)', 'stroke-width':'2', 'stroke-linecap':'round' }),
  h('text', { x:160, y:142, 'text-anchor':'middle', fill:'rgba(255,255,255,0.55)', 'font-size':'10', 'font-family':'serif', 'letter-spacing':'3' }, 'NOBLE'),
  h('text', { x:16, y:38, fill:'rgba(255,255,255,0.06)', 'font-size':'28', 'font-family':'sans-serif', 'font-weight':'700', 'letter-spacing':'3' }, 'NOBLE'),
]) })

const SvgOrion = defineComponent({ render: () => h('svg', {
  viewBox: '0 0 320 240', xmlns: 'http://www.w3.org/2000/svg',
  style: 'width:100%;height:100%;position:absolute;inset:0;',
}, [
  // Bars
  ...[
    [36,175,60],[78,155,80],[120,130,105],[162,108,127],[204,148,87],[246,168,67],[288,185,50],
  ].map(([x, y, bh]) => [
    h('rect', { x: x-13, y, width:26, height: bh, rx:2, fill:'#B8FF00', opacity:'0.12' }),
  ]).flat(),
  h('rect', { x:149, y:108, width:26, height:127, rx:2, fill:'#B8FF00', opacity:'0.65' }),
  h('line', { x1:16, y1:235, x2:304, y2:235, stroke:'rgba(184,255,0,0.15)', 'stroke-width':'1' }),
  h('text', { x:162, y:98, 'text-anchor':'middle', fill:'#B8FF00', 'font-size':'11', 'font-family':'monospace' }, '94.2'),
  h('text', { x:16, y:38, fill:'rgba(255,255,255,0.06)', 'font-size':'28', 'font-family':'sans-serif', 'font-weight':'700', 'letter-spacing':'3' }, 'ORION'),
]) })

const SvgMeridian = defineComponent({ render: () => h('svg', {
  viewBox: '0 0 320 240', xmlns: 'http://www.w3.org/2000/svg',
  style: 'width:100%;height:100%;position:absolute;inset:0;',
}, [
  h('defs', {}, [
    h('linearGradient', { id:'mg', x1:'0', y1:'0', x2:'1', y2:'1' }, [
      h('stop', { offset:'0%', 'stop-color':'#FF2D78' }),
      h('stop', { offset:'100%', 'stop-color':'#7B2FFF' }),
    ]),
  ]),
  // Dot grid
  ...[...Array(7)].flatMap((_, col) =>
    [...Array(5)].map((_, row) => {
      const accent = (col + row) % 3 === 0
      return h('circle', {
        cx: 32 + col * 44, cy: 36 + row * 44,
        r: accent ? 5 : 2.5,
        fill: accent ? 'url(#mg)' : 'rgba(255,255,255,0.1)',
        opacity: accent ? 0.9 : 0.35,
      })
    })
  ),
  // Connecting path through accent dots
  h('polyline', {
    points: '32,36 120,80 208,124 296,80',
    fill:'none', stroke:'url(#mg)', 'stroke-width':'1', opacity:'0.25',
  }),
  h('text', { x:16, y:228, fill:'rgba(255,255,255,0.05)', 'font-size':'24', 'font-family':'sans-serif', 'font-weight':'700', 'letter-spacing':'3' }, 'MERIDIAN'),
]) })

// ─── Data ─────────────────────────────────────────────────────────
const projects = [
  {
    id: '01', name: 'VANTA CAPITAL', category: 'Brand Identity · Motion System', year: '2024',
    svgBg: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 100%)',
    svgComponent: SvgVanta,
    description: 'Vanta needed to signal growth without arrogance. We built a full motion language — ticker animations, data transitions, and a broadcast-ready identity system spanning Bloomberg placements and investor decks.',
    deliverables: ['Identity', 'Motion System', 'Data Viz', 'Brand Film'],
    outcome: '+218%', outcomeLabel: 'Increase in inbound investor inquiries post-launch',
  },
  {
    id: '02', name: 'AETHER LABS', category: 'Product Launch · 3D Direction', year: '2024',
    svgBg: 'linear-gradient(135deg, #020d1a 0%, #061825 100%)',
    svgComponent: SvgAether,
    description: 'A 90-second hero film for Aether\'s AI infrastructure launch — directed and animated in-house. Abstract compute concepts translated into a visual language of orbiting systems and signal paths.',
    deliverables: ['3D Animation', 'Hero Film', 'Social Cutdowns'],
    outcome: '4.2M', outcomeLabel: 'Views in 72 hours across LinkedIn and X',
  },
  {
    id: '03', name: 'NOBLE COFFEE', category: 'Packaging Reveal · Campaign', year: '2023',
    svgBg: 'linear-gradient(135deg, #1a0f00 0%, #2e1a00 100%)',
    svgComponent: SvgNoble,
    description: 'Noble wanted their rebrand to feel like a ritual, not a product launch. A slow-burn reveal campaign — unwrap sequences, ambient brand films, and a social rollout designed to reward the attentive consumer.',
    deliverables: ['Packaging Film', 'OOH Motion', 'Social Campaign', 'Art Direction'],
    outcome: '38K', outcomeLabel: 'Pre-orders within the first week of campaign',
  },
  {
    id: '04', name: 'ORION SPORTS', category: 'Broadcast Package · Live Graphics', year: '2023',
    svgBg: 'linear-gradient(135deg, #0a1500 0%, #111e00 100%)',
    svgComponent: SvgOrion,
    description: 'A complete real-time broadcast package for Orion\'s regional league coverage — lower thirds, wipes, score overlays, and a season-long ident anchoring every match night.',
    deliverables: ['Broadcast Package', 'Live Graphics', 'Ident', 'Motion Templates'],
    outcome: '12 Hrs', outcomeLabel: 'Of live broadcast powered by the motion system',
  },
  {
    id: '05', name: 'MERIDIAN', category: 'Interactive Lookbook · Web Experience', year: '2023',
    svgBg: 'linear-gradient(135deg, #12000a 0%, #1e0010 100%)',
    svgComponent: SvgMeridian,
    description: 'Meridian\'s SS24 collection needed a digital presence that matched the precision of the garments. Scroll-driven transitions, editorial pacing, and magnetic hover interactions throughout.',
    deliverables: ['Web Design', 'Frontend Build', 'Interactive', 'Art Direction'],
    outcome: '7 Min', outcomeLabel: 'Avg session duration — 4× industry standard',
  },
]

// ─── Toggle ───────────────────────────────────────────────────────
async function toggleProject(index: number) {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')
  const isSame = activeProject.value === index

  if (activeProject.value !== null) {
    const panel = panelRefs.value[activeProject.value]
    if (panel) gsap.to(panel, { height: 0, duration: 0.45, ease: 'power3.inOut' })
  }

  if (isSame) { activeProject.value = null; return }

  activeProject.value = index
  const panel = panelRefs.value[index]
  const inner = panelInnerRefs.value[index]
  if (panel && inner) {
    gsap.fromTo(panel, { height: 0 }, { height: inner.scrollHeight, duration: 0.5, ease: 'power3.inOut' })
    const els = inner.querySelectorAll('.project-svg-wrap, p, .flex.gap-2, [class*="font-display"]')
    gsap.fromTo(els, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06, delay: 0.2 })
  }
}

async function onRowHover(btn: HTMLElement, enter: boolean) {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')
  const num   = btn.querySelector('.project-num')  as HTMLElement
  const name  = btn.querySelector('.project-name') as HTMLElement
  const arrow = btn.querySelector('.project-arrow') as HTMLElement
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()

  if (enter) {
    gsap.to([num, name], { color: accent, duration: 0.25 })
    gsap.to(arrow, { x: 10, y: -2, duration: 0.3, ease: 'power3.out' })
  } else {
    gsap.to(num,  { color: 'rgba(255,255,255,0.1)', duration: 0.3 })
    gsap.to(name, { color: '#ffffff', duration: 0.3 })
    gsap.to(arrow, { x: 0, y: 0, duration: 0.3, ease: 'power3.out' })
  }
}

// ─── Mount ────────────────────────────────────────────────────────
onMounted(async () => {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')

  if (headlineRef.value) {
    const split = splitText(headlineRef.value, 'chars')
    if (split?.chars.length) {
      gsap.fromTo(split.chars, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.025,
        scrollTrigger: { trigger: headlineRef.value, start: 'top 80%' },
      })
    }
  }

  const cards = cardsRef.value?.querySelectorAll('.work-card')
  if (cards?.length) {
    gsap.fromTo(cards, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: cardsRef.value, start: 'top 75%' },
    })
  }
})
</script>