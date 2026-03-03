import { useScroll } from '../context/ScrollContext'
import { motion } from 'framer-motion'

const MOUSE_ICON =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjg3NSAzSDEwLjEyNUM3LjIyNTUxIDMgNC44NzUgNS4zNTA1MSA0Ljg3NSA4LjI1VjE1Ljc1QzQuODc1IDE4LjY0OTUgNy4yMjU1MSAyMSAxMC4xMjUgMjFIMTMuODc1QzE2Ljc3NDUgMjEgMTkuMTI1IDE4LjY0OTUgMTkuMTI1IDE1Ljc1VjguMjVDMTkuMTI1IDUuMzUwNTEgMTYuNzc0NSAzIDEzLjg3NSAzWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIgMTAuNVY2Ljc1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='

export function HeroSection() {
  const { section, setMoonClickZoomOut, scrollToSection, scrollProgress, getProgressFor } = useScroll()

  const handleMoonClick = () => {
    setMoonClickZoomOut?.(true)
    scrollToSection?.('about')
  }

  const { start, end } = getProgressFor('hero')
  const span = end - start || 1
  const heroLocal =
    span > 0
      ? Math.max(0, Math.min(1, (scrollProgress - start) / span))
      : 0
  const indicatorOpacity = 1 - heroLocal * 1.2



  return (
    <section
      className="absolute left-0 right-0 flex flex-col items-center text-center px-6"
      style={{ top: 0, height: '100vh', pointerEvents: 'none' }}
      aria-label="Hero"
    >
      {/* ===== TEXT BLOCK ===== */}
      <div
        className="relative pt-[52vh] md:pt-[54vh] flex flex-col items-center gap-4 max-w-[900px] mx-auto"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%)',
        }}
      >
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-nav"
          style={{
            textShadow:
              '0 4px 40px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.7)',
          }}
        >
          Welcome to <br />
          Regita Lisgiani's Space
        </h1>

        <p
          className="text-xl md:text-2xl text-slate-200 font-semibold tracking-wide"
          style={{
            textShadow:
              '0 3px 25px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)',
          }}
        >
          Backend Engineer
        </p>
      </div>

      {/* ===== VIGNETTE ===== */}
      <div
        className="absolute inset-0 pointer-events-none"
        // style={{
        //   background:
        //     'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.55) 100%)',
        // }}
        aria-hidden
      />

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            pointerEvents: 'none',
            opacity: indicatorOpacity,
          }}
        >
          <motion.img
            src={MOUSE_ICON}
            alt="Scroll"
            className="w-8 h-8 opacity-90 drop-shadow-[0_0_14px_rgba(255,255,255,0.55)]"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            draggable={false}
          />

        <span
          className="text-[11px] tracking-[0.22em] uppercase text-white font-semibold"
          style={{
            textShadow:
              '0 2px 18px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7)',
          }}
        >
          Scroll to know more
        </span>
      </motion.div>

      {/* ===== CLICK AREA ===== */}
      <button
        type="button"
        onClick={handleMoonClick}
        className="absolute inset-0 w-full h-full cursor-pointer"
        style={{ zIndex: 5, pointerEvents: 'auto' }}
        aria-label="Scroll to About (moon)"
      />
    </section>
  )
}