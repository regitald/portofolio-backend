import { useScroll } from '../context/ScrollContext'

export function ScrollProgressBar() {
  const { scrollProgress } = useScroll()
  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-indigo-400/70 transition-transform duration-300 ease-out"
        style={{ width: '100%', transform: `scaleX(${scrollProgress})`, transformOrigin: 'left' }}
      />
    </div>
  )
}
