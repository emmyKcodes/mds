export const SECTION_ACCENTS: Record<string, string> = {
  hero: '#7B2FFF',
  work: '#FF2D78',
  about: '#00E5FF',
  services: '#B8FF00',
  contact: '#7B2FFF',
}

export function useAccentColor() {
  function setAccent(section: string) {
    if (import.meta.client) {
      const color = SECTION_ACCENTS[section] ?? '#7B2FFF'
      document.documentElement.style.setProperty('--accent', color)
    }
  }

  return { setAccent }
}
