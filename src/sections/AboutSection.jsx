import { useRef, useState, useEffect, useMemo } from 'react'
import { useScroll } from '../context/ScrollContext'
import { aboutText, portraitSrc, roles } from '../data/portfolio'
import gsap from 'gsap'

const LERP = 0.045

/* ================= BACK TEXT GLOW ================= */

function TextGlow() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(circle at 35% 45%, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.55) 35%, rgba(2,6,23,0.25) 55%, transparent 75%)',
        filter: 'blur(28px)',
      }}
    />
  )
}

/* ================= MAIN ================= */

export function AboutSection() {
  const portraitRef = useRef(null)
  const imgHiRef = useRef(null)
  const imgTypingRef = useRef(null)
  const shadowRef = useRef(null)
  const lerpRef = useRef({ scale: 0.6, x: 0 })
  const [imgError, setImgError] = useState(false)

  const { scrollProgress, getProgressFor } = useScroll()

  const { start: aboutStart, end: aboutEnd } = getProgressFor('about')
  const { start: rolesStart, end: rolesEnd } = getProgressFor('roles')

  /* ================= SCALE ================= */

  useEffect(() => {
    const p = scrollProgress
    let targetScale = 0.85
    let targetX = 0

    if (p >= aboutStart && p < aboutEnd) {
      const local = (p - aboutStart) / (aboutEnd - aboutStart)
      targetScale = 0.85 + 0.22 * local
      targetX = 0
    } else if (p >= rolesStart && p < rolesEnd) {
      const local = (p - rolesStart) / (rolesEnd - rolesStart)
      targetScale = 0.91 + 0.14 * (1 - local)
      targetX = -60 * local
    } else if (p >= rolesEnd) {
      targetScale = 0.91
      targetX = -60
    }

    if (portraitRef.current) {
      portraitRef.current.__target = { scale: targetScale, x: targetX }
    }
  }, [scrollProgress, aboutStart, aboutEnd, rolesStart, rolesEnd])

  /* ================= LERP ================= */

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const ref = portraitRef.current
      const target = ref?.__target ?? { scale: 0.5, x: 0 }
      const curr = lerpRef.current

      curr.scale += (target.scale - curr.scale) * LERP
      curr.x += (target.x - curr.x) * LERP

      if (ref) gsap.set(ref, { scale: curr.scale, x: curr.x })

      if (shadowRef.current) {
        gsap.set(shadowRef.current, {
          scaleX: curr.scale * 1.25,
          scaleY: curr.scale * 0.6,
          opacity: 0.28 + curr.scale * 0.15,
        })
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* ================= CROSSFADE ================= */

  useEffect(() => {
    if (!imgHiRef.current || !imgTypingRef.current) return

    const inAbout =
      scrollProgress >= aboutStart &&
      scrollProgress < aboutEnd

    const inRoles =
      scrollProgress >= rolesStart &&
      scrollProgress < rolesEnd

    if (inAbout) {
      gsap.to(imgHiRef.current, { opacity: 1, duration: 0.45 })
      gsap.to(imgTypingRef.current, { opacity: 0, duration: 0.45 })
    }

    if (inRoles) {
      gsap.to(imgHiRef.current, { opacity: 0, duration: 0.45 })
      gsap.to(imgTypingRef.current, { opacity: 1, duration: 0.45 })
    }
  }, [scrollProgress, aboutStart, aboutEnd, rolesStart, rolesEnd])

  const inAbout =
    scrollProgress >= aboutStart && scrollProgress < aboutEnd
  const inRoles =
    scrollProgress >= rolesStart && scrollProgress < rolesEnd

  return (
    <section
      className="absolute left-0 right-0 flex justify-center items-center px-6 pointer-events-none"
      style={{ top: '100vh', height: '270vh' }}
      aria-label="About & Roles"
    >

      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row-reverse items-end justify-center gap-10 md:gap-16 max-w-6xl mx-auto pb-2">
        {/* ===== PORTRAIT ===== */}
        <div
          ref={portraitRef}
          className="flex-shrink-0 relative translate-y-[6px]
            w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px]
            aspect-[2/3]"
          style={{ willChange: 'transform' }}
        >
          {!imgError ? (
            <div className="relative">
              <img
                ref={imgHiRef}
                src={portraitSrc}
                alt="Regita Hi"
                className="w-full h-auto object-contain absolute inset-0"
                style={{
                  filter: 'drop-shadow(0 12px 44px rgba(99,102,241,0.35))',
                  animation: 'float-subtle 8s ease-in-out infinite',
                }}
                onError={() => setImgError(true)}
              />

              <img
                ref={imgTypingRef}
                src="/assets/my_picture2.png"
                alt="Regita Typing"
                className="w-full h-auto object-contain absolute inset-0"
                style={{
                  opacity: 0,
                  filter: 'drop-shadow(0 12px 44px rgba(99,102,241,0.35))',
                  animation: 'float-subtle 8s ease-in-out infinite',
                }}
              />

              <div
                ref={shadowRef}
                className="absolute left-1/2 -translate-x-1/2 bottom-[-6px]"
                style={{
                  width: 170,
                  height: 44,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 40%, transparent 70%)',
                  filter: 'blur(6px)',
                }}
              />
            </div>
          ) : (
            <div className="w-56 h-56 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 text-sm">
              Add /assets/my_picture.png
            </div>
          )}
        </div>

        {/* ===== TEXT ===== */}
        <div className="flex-1 text-center md:text-left max-w-lg xl:max-w-xl min-h-[200px] relative md:-translate-y-10">
          <TextGlow />

          {inAbout && (
            <div className="animate-fadeIn relative ">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                About Me
              </h2>
              <p className="text-slate-200 leading-relaxed text-base md:text-lg font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {aboutText}
              </p>
            </div>
          )}

          {inRoles && (
            <div className="animate-fadeIn relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                What I Do
              </h2>

              <div className="space-y-8">
                {roles.map((r) => (
                  <div key={r.title} className="relative">
                    <div className="absolute -top-4 left-0 w-12 h-px bg-gradient-to-r from-indigo-400/60 to-transparent" />

                    <h3 className="text-white font-semibold text-xl tracking-tight">
                      {r.title}
                    </h3>

                    <p className="text-indigo-200 text-sm font-medium mt-1">
                      {r.subtitle}
                    </p>

                    <p className="text-slate-200 text-sm mt-3 leading-relaxed max-w-lg">
                      {r.description}
                    </p>

                    <p className="text-amber-400/90 text-xs font-mono mt-3">
                      {r.tech}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}