import { useScroll } from '../context/ScrollContext'
import { cn } from '../lib/utils'
import { SoundToggle } from './audio/SoundToggle'

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'roles', label: 'Roles' },
  { id: 'tech', label: 'Tech' },
  { id: 'projects', label: 'Projects' },
  { id: 'chat', label: 'Chat' },
  { id: 'contact', label: 'Contact' },
]

export function Nav({ audioOn, onAudioToggle }) {
  const { section, scrollToSection } = useScroll()

  return (
    <nav className="fixed top-0 right-0 z-30 flex items-center gap-4 pr-6 pt-5 font-nav" style={{ pointerEvents: 'auto' }}>
      <SoundToggle audioOn={audioOn} onToggle={onAudioToggle} />
      {/* {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => scrollToSection(s.id)}
          className={cn(
            'relative px-3 py-2 text-[13px] font-medium tracking-wide transition-all duration-200',
            section === s.id
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200'
          )}
        >
          {s.label}
          {section === s.id && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px bg-indigo-400/80 rounded-full" />
          )}
        </button>
      ))} */}
    </nav>
  )
}
