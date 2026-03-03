import { memo } from 'react'
import { cn } from '../../lib/utils'

export const SoundToggle = memo(function SoundToggle({ audioOn, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex items-center gap-3 h-8 rounded-full pl-3 pr-1 transition-all duration-300',
        'border border-white/20 bg-black/30 backdrop-blur-sm',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--space-bg)]',
        audioOn && 'shadow-[0_0_12px_rgba(34,211,238,0.2)] border-cyan-400/30'
      )}
      aria-label={audioOn ? 'Mute ambient audio' : 'Play ambient audio'}
    >
      <span
        className={cn(
          'text-[10px] font-medium tracking-[0.15em] uppercase',
          audioOn ? 'text-cyan-300/90' : 'text-slate-400'
        )}
      >
        {audioOn ? 'SOUND ON' : 'SOUND OFF'}
      </span>
      <span className="relative flex h-6 w-12 shrink-0 rounded-full bg-white/10 border border-white/10">
        <span
          className={cn(
            'absolute top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300',
            audioOn ? 'left-7' : 'left-1'
          )}
        />
      </span>
    </button>
  )
})
