import { useRef, useState, useEffect } from 'react'
import { useScroll } from '../context/ScrollContext'
import { developerName, roleTitle, portraitSrc, aboutText, roles } from '../data/portfolio'
import gsap from 'gsap'

const PORTRAIT_LERP = 0.055

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothStep(t) {
  return t * t * (3 - 2 * t)
}

export function IntroSection() {
  const nameRef = useRef(null)
  const aboutRef = useRef(null)
  const whatIDoRef = useRef(null)
  const portraitRef = useRef(null)
  const portraitCurrent = useRef({ scale: 1, x: 0, y: 0 })
  const rafRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const { scrollProgress, getProgressFor, containerRef, setMoonClickZoomOut } = useScroll()
  const { start: introStart, end: introEnd } = getProgressFor('intro')

  const handleMoonClick = () => {
    setMoonClickZoomOut?.(true)
    const el = containerRef?.current
    if (el) {
      const span = introEnd - introStart
      const targetP = introStart + span * 0.5
      const targetScroll = targetP * (el.scrollHeight - el.clientHeight)
      gsap.to(el, { scrollTop: targetScroll, duration: 1.2, ease: 'power2.inOut' })
    }
  }

  useEffect(() => {
    const span = introEnd - introStart
    if (span <= 0) return
    const p = scrollProgress
    const local = Math.max(0, Math.min(1, (p - introStart) / span))
    const e = easeInOutCubic
    const s = smoothStep

    const nameOpacity = local <= 0.22 ? 1 : local >= 0.42 ? 0 : 1 - (local - 0.22) / 0.2
    const aboutOpacity = local < 0.38 ? 0 : local <= 0.62 ? 1 : local >= 0.8 ? 0 : 1 - (local - 0.62) / 0.18
    const whatOpacity = local < 0.58 ? 0 : s((local - 0.58) / 0.42)

    if (nameRef.current) gsap.set(nameRef.current, { opacity: nameOpacity })
    if (aboutRef.current) gsap.set(aboutRef.current, { opacity: aboutOpacity })
    if (whatIDoRef.current) gsap.set(whatIDoRef.current, { opacity: whatOpacity })

    const stage1 = Math.min(1, local / 0.38)
    const stage2 = Math.max(0, Math.min(1, (local - 0.38) / 0.32))
    const stage3 = Math.max(0, (local - 0.72) / 0.28)

    const targetScale =
      local <= 0.38
        ? 0.96 + 0.04 * e(stage1)
        : local <= 0.72
          ? 1 - 0.15 * e(stage2)
          : 0.85 + 0.15 * e(stage3)

    const targetX =
      local <= 0.38
        ? 0
        : local <= 0.72
          ? -90 * e(stage2)
          : -90 + 50 * e(stage3)

    const targetY = Math.sin(local * Math.PI * 1.5) * 3

    portraitCurrent.current = { scale: targetScale, x: targetX, y: targetY }
  }, [scrollProgress, introStart, introEnd, getProgressFor])

  useEffect(() => {
    const tick = () => {
      const curr = portraitCurrent.current
      const ref = portraitRef.current
      if (!ref) return
      const current = ref._lerp ?? { scale: 1, x: 0, y: 0 }
      ref._lerp = {
        scale: current.scale + (curr.scale - current.scale) * PORTRAIT_LERP,
        x: current.x + (curr.x - current.x) * PORTRAIT_LERP,
        y: current.y + (curr.y - current.y) * PORTRAIT_LERP,
      }
      const { scale, x, y } = ref._lerp
      gsap.set(ref, { scale, x, y })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      className="pointer-events-none absolute left-0 right-0 flex justify-center items-center"
      style={{ height: '250vh', top: 0 }}
      aria-label="Intro"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col justify-center text-center md:text-left order-2 md:order-1 min-h-[160px] relative">
          <div ref={nameRef} className="absolute inset-0 flex flex-col justify-center items-center md:items-start" style={{ pointerEvents: 'none' }}>
            <p className="text-indigo-300 font-mono text-sm tracking-wide mb-2">Hello, I&apos;m</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              {developerName}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mt-3 font-medium">{roleTitle}</p>
          </div>
          <div ref={aboutRef} className="absolute inset-0 flex flex-col justify-center items-center md:items-start opacity-0" style={{ pointerEvents: 'none' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              About Me
            </h2>
            <p className="text-slate-200 leading-relaxed max-w-xl mx-auto md:mx-0 md:text-left text-base font-medium">
              {aboutText}
            </p>
          </div>
          <div ref={whatIDoRef} className="absolute inset-0 flex flex-col justify-center items-center md:items-start opacity-0 overflow-y-auto max-h-[75vh] py-4" style={{ pointerEvents: 'none' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight flex-shrink-0">
              What I Do
            </h2>
            <div className="space-y-4 text-left max-w-xl w-full flex-shrink-0">
              {roles.map((r) => (
                <div key={r.title} className="rounded-xl glass-panel p-5 border border-white/10">
                  <h3 className="text-white font-semibold text-lg">{r.title}</h3>
                  <p className="text-indigo-200 text-sm font-medium mt-0.5">{r.subtitle}</p>
                  <p className="text-slate-200 text-sm mt-2 leading-relaxed">{r.description}</p>
                  <p className="text-amber-400/90 text-xs font-mono mt-3">{r.tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={portraitRef}
          className="flex-shrink-0 order-1 md:order-2 portrait-wrap"
          style={{ willChange: 'transform' }}
        >
          {!imgError ? (
            <img
              src={portraitSrc}
              alt={developerName}
              className="max-w-[200px] sm:max-w-[240px] md:max-w-[280px] w-full h-auto object-contain object-center"
              style={{
                filter: 'drop-shadow(0 0 24px rgba(99, 102, 241, 0.15))',
                animation: 'float-subtle 7s ease-in-out infinite',
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-48 h-48 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 text-sm">
              Add /assets/my_picture.png
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleMoonClick}
        className="absolute left-1/2 bottom-[22%] -translate-x-1/2 w-24 h-24 rounded-full pointer-events-auto cursor-pointer opacity-0 focus:opacity-0 focus:ring-2 focus:ring-indigo-400/50 rounded-full"
        style={{ zIndex: 5 }}
        aria-label="Scroll to About (moon)"
      />
    </section>
  )
}
