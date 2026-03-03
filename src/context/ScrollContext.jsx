import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import gsap from 'gsap'

const ScrollContext = createContext(null)

export const SECTION_HEIGHTS = {
  hero: 0.8,
  about: 2,
  roles: 1,
  experience: 0.6,
  projects: 4.6,
  tech: 2,
  chat: 1.2,
  contact: 1.2,
}

const ORDER = [
  'hero',
  'about',
  'roles',
  'experience',
  'projects',
  'tech',
  'chat',
  'contact',
]

const TOTAL_VH = Object.values(SECTION_HEIGHTS).reduce((a, b) => a + b, 0)

export function ScrollProvider({ children }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [section, setSection] = useState('hero')
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const getProgressFor = useCallback((name) => {
    const idx = ORDER.indexOf(name)
    if (idx < 0) return { start: 0, end: 0, span: 0 }

    let start = 0
    for (let i = 0; i < idx; i++) {
      start += SECTION_HEIGHTS[ORDER[i]]
    }

    const span = SECTION_HEIGHTS[name]

    return {
      start: start / TOTAL_VH,
      end: (start + span) / TOTAL_VH,
      span: span / TOTAL_VH,
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrollTop = window.scrollY
      const max = el.scrollHeight - window.innerHeight
      const progress = max <= 0 ? 0 : scrollTop / max

      setScrollProgress(progress)

      const vh = scrollTop / window.innerHeight
      let acc = 0

      for (const s of ORDER) {
        if (vh >= acc && vh < acc + SECTION_HEIGHTS[s]) {
          setSection(s)
          break
        }
        acc += SECTION_HEIGHTS[s]
      }
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onMouse = (e) =>
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })

    window.addEventListener('mousemove', onMouse)
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  return (
    <ScrollContext.Provider
      value={{
        scrollProgress,
        section,
        mouse,
        getProgressFor,
        TOTAL_VH,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useScroll must be used within ScrollProvider')
  return ctx
}