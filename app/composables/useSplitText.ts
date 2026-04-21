/**
 * Pure-JS text splitter — no Club GSAP required.
 */
export interface SplitResult {
  words: HTMLElement[]
  chars: HTMLElement[]
  lines: HTMLElement[]
  revert: () => void
}

function wrapChars(el: HTMLElement): SplitResult {
  const original = el.innerHTML
  const text = el.textContent ?? ''
  el.innerHTML = ''
  const chars: HTMLElement[] = []
  const words: HTMLElement[] = []

  text.split(' ').forEach((word, wi) => {
    if (wi > 0) el.appendChild(document.createTextNode(' '))
    const wordWrap = document.createElement('span')
    wordWrap.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:top;'
    words.push(wordWrap)
    word.split('').forEach((char) => {
      const s = document.createElement('span')
      s.style.cssText = 'display:inline-block;'
      s.textContent = char
      chars.push(s)
      wordWrap.appendChild(s)
    })
    el.appendChild(wordWrap)
  })

  return {
    words,
    chars,
    lines: words,
    revert: () => { el.innerHTML = original },
  }
}

function wrapWords(el: HTMLElement): SplitResult {
  const original = el.innerHTML
  const words: HTMLElement[] = []

  function processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? ''
      const frag = document.createDocumentFragment()
      text.split(/(\s+)/).forEach((part) => {
        if (/^\s+$/.test(part) || part === '') {
          frag.appendChild(document.createTextNode(part))
        } else {
          const outer = document.createElement('span')
          outer.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:top;'
          const inner = document.createElement('span')
          inner.style.cssText = 'display:inline-block;'
          inner.textContent = part
          outer.appendChild(inner)
          words.push(inner)
          frag.appendChild(outer)
        }
      })
      node.parentNode?.replaceChild(frag, node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      ;[...node.childNodes].forEach(processNode)
    }
  }
  ;[...el.childNodes].forEach(processNode)

  return { words, chars: words, lines: words, revert: () => { el.innerHTML = original } }
}

function wrapLines(el: HTMLElement): SplitResult {
  const original = el.innerHTML
  const text = el.textContent ?? ''
  const wordList = text.split(/\s+/).filter(Boolean)

  el.innerHTML = wordList.map((w) => `<span class="__sw" style="display:inline;">${w} </span>`).join('')
  const spans = [...el.querySelectorAll('.__sw')] as HTMLElement[]
  const groups: HTMLElement[][] = []
  let current: HTMLElement[] = []
  let lastTop = -Infinity

  spans.forEach((span) => {
    const top = span.getBoundingClientRect().top
    if (Math.abs(top - lastTop) > 2 && current.length) { groups.push(current); current = [] }
    lastTop = top
    current.push(span)
  })
  if (current.length) groups.push(current)

  el.innerHTML = ''
  const lineEls: HTMLElement[] = []
  groups.forEach((group) => {
    const outer = document.createElement('div')
    outer.style.cssText = 'overflow:hidden; display:block;'
    const inner = document.createElement('div')
    inner.style.cssText = 'display:block;'
    inner.textContent = group.map((s) => (s.textContent ?? '').trim()).join(' ')
    outer.appendChild(inner)
    el.appendChild(outer)
    lineEls.push(inner)
  })

  return { words: lineEls, chars: lineEls, lines: lineEls, revert: () => { el.innerHTML = original } }
}

export function splitText(el: HTMLElement | null, type: 'words' | 'chars' | 'lines' = 'words'): SplitResult | null {
  if (!el) return null
  if (type === 'chars') return wrapChars(el)
  if (type === 'lines') return wrapLines(el)
  return wrapWords(el)
}
