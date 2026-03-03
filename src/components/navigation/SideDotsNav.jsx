import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useScroll } from '../../context/ScrollContext'
import { cn } from '../../lib/utils'

const ORDER = ['hero', 'about', 'roles', 'experience', 'projects', 'tech', 'chat', 'contact']
const LABELS = {
  hero: 'Hero',
  about: 'About',
  roles: 'Roles',
  experience: 'Experience',
  projects: 'Projects',
  tech: 'Tech',
  chat: 'Chat',
  contact: 'Contact',
}

export function SideDotsNav() {
  const { section, scrollToSection } = useScroll()

  const items = useMemo(() => ORDER.map((id) => ({ id, label: LABELS[id] })), [])

  return (
    <div
      className="fixed left-0 top-0 bottom-0 w-3 min-h-screen flex flex-col items-center z-20 pointer-events-none"
      style={{ background: 'rgba(0,0,0,0.2)' }}
    >
      <nav
        className="flex flex-col items-center justify-center flex-1 gap-4 pointer-events-auto py-8"
        aria-label="Section navigation"
      >
        {items.map(({ id, label }) => {
          const isActive = section === id
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={cn(
                'group relative flex items-center gap-3 outline-none',
                'focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--space-bg)]'
              )}
              aria-label={`Go to ${label}`}
              aria-current={isActive ? 'true' : undefined}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive ? (
                <span className="block w-px h-5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              ) : (
                <span className="block w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-slate-300 transition-all duration-300" />
              )}
              <span className="absolute left-6 whitespace-nowrap text-xs font-medium text-slate-400 group-hover:text-white pointer-events-none transition-all duration-200 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0">
                {label}
              </span>
            </motion.button>
          )
        })}
      </nav>
      <button
        type="button"
        onClick={() => scrollToSection('hero')}
        className="flex flex-col items-center gap-0.5 pb-6 text-[10px] font-medium tracking-wider uppercase text-slate-500 hover:text-white transition-colors pointer-events-auto"
        aria-label="Scroll to top"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
        TOP
      </button>
    </div>
  )
}
