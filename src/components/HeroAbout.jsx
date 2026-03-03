import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const IMAGE_SRC = '/me.jpg'

const roles = [
  {
    title: 'Backend Developer',
    subtitle: 'APIs, database & CMS',
    description: 'Building REST APIs, admin panels, dan CMS dengan Laravel & PHP. Fokus clean code, validation, dan dokumentasi API. Pengalaman integrasi payment, auth, dan third-party services.',
    tech: 'Laravel, PHP, MySQL, PostgreSQL, Redis',
  },
  {
    title: 'Full-Stack',
    subtitle: 'Web apps & dashboards',
    description: 'Responsive web apps pakai React, Vue, dan Bootstrap. Bikin dashboard, landing page, dan integrasi frontend–backend. Suka maintainable structure dan reusable components.',
    tech: 'React, Vue, Tailwind, Bootstrap, Node.js',
  },
]

export function HeroAbout() {
  const sectionRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // 3 stage konten: Intro → Bio → What I Do
  const introOpacity = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0])
  const aboutOpacity = useTransform(scrollYProgress, [0.25, 0.38, 0.48, 0.58], [0, 0, 1, 0])
  const whatIDoOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 0, 1])

  // Image: tengah → lebih kiri (bio) → tengah lagi (what I do)
  const imageX = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0, -260, -260, 0, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [1, 0.9, 0.9, 1, 1])
  const imageRound = useTransform(scrollYProgress, (v) => `${12 + Math.min(v * 6, 4)}px`)

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative"
      style={{ height: '300vh' }}
      aria-label="Intro, About & What I Do"
    >
      <span id="about" className="absolute top-0 left-0 block -translate-y-20" aria-hidden />
      <span id="work" className="absolute top-0 left-0 block -translate-y-20" aria-hidden />

      {/* Bumi malam hari → pelan-pelan ke luar angkasa (gradient ke bawah) */}
      <div
        className="absolute inset-0 -z-10 h-screen w-full"
        style={{
          background: `
            linear-gradient(180deg,
              hsl(225 50% 8%) 0%,
              hsl(230 45% 6%) 40%,
              hsl(240 40% 5%) 70%,
              #050508 100%
            ),
            radial-gradient(ellipse 60% 40% at 50% 20%, rgba(59, 130, 246, 0.08), transparent 50%),
            radial-gradient(ellipse 80% 50% at 80% 80%, rgba(251, 191, 36, 0.06), transparent 45%)
          `,
        }}
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden pt-20">
        <div className="max-w-6xl mx-auto h-full w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4 px-4 pb-12">
          {/* Kolom kiri: Intro (name) / kosong saat Bio & What I Do */}
          <div className="flex-1 min-w-0 flex flex-col justify-center order-1 md:order-1 text-center md:text-left">
            <motion.div style={{ opacity: introOpacity }} className="pointer-events-none">
              <p className="text-blue-200/90 mb-1 font-mono text-sm">Hello! I&apos;m</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
                Your Name
              </h1>
            </motion.div>
          </div>

          {/* Gambar: tengah → kiri (bio) → tengah lagi (what I do) */}
          <motion.div
            style={{ x: imageX, scale: imageScale }}
            className="flex-shrink-0 order-3 md:order-2 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto md:mx-0"
          >
            <motion.div
              style={{ borderRadius: imageRound }}
              className="w-full h-full overflow-hidden border border-blue-400/20 shadow-2xl shadow-blue-950/30 relative"
            >
              {!imgError ? (
                <img
                  src={IMAGE_SRC}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : null}
              {imgError && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/40 flex items-center justify-center">
                  <span className="text-white/60 text-xs">Foto (public/me.jpg)</span>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Kolom kanan: Role (intro) / About Me (bio) / What I Do (cards) */}
          <div className="flex-1 min-w-0 flex flex-col justify-center order-2 md:order-3 text-center md:text-right relative min-h-[200px] md:min-h-0">
            {/* Stage 1: Role */}
            <motion.div
              style={{ opacity: introOpacity }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <p className="text-white/90 text-sm md:text-base mb-1">An</p>
              <p className="text-amber-300 font-semibold text-xl md:text-2xl">Backend Developer</p>
              <p className="text-white font-bold text-2xl md:text-3xl uppercase tracking-tight">
                Full-Stack Dev
              </p>
            </motion.div>

            {/* Stage 2: About Me */}
            <motion.div
              style={{ opacity: aboutOpacity }}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-right pointer-events-none"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-blue-200/90 mb-4 uppercase tracking-wide">
                About Me
              </h2>
              <p className="text-slate-200/90 leading-relaxed max-w-xl mx-auto md:ml-auto md:mr-0 md:text-right">
                Self-taught Backend & Full-Stack Developer dari Indonesia. Fokus di Laravel, API, dan CMS;
                suka sentuhan frontend pakai React, Vue, dan Bootstrap. Prioritas clean code dan sistem yang maintainable.
                Tertarik kolaborasi dan proyek yang impactful.
              </p>
            </motion.div>

            {/* Stage 3: What I Do (cards) */}
            <motion.div
              style={{ opacity: whatIDoOpacity }}
              className="absolute inset-0 flex flex-col justify-center w-full max-w-xl ml-auto"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight text-left md:text-right">
                What I Do
              </h2>
              <div className="space-y-4 text-left">
                {roles.map((role, i) => (
                  <div key={role.title} className="relative">
                    <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-dashed border-violet-500/40" style={{ padding: '2px' }} />
                    <div className="relative rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 pr-12">
                      <h3 className="text-lg font-bold text-white mb-0.5">{role.title}</h3>
                      <p className="text-blue-200/90 text-xs mb-2">{role.subtitle}</p>
                      <AnimatePresence mode="wait">
                        {expanded === i ? (
                          <motion.div
                            key="expanded"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-slate-200/90 text-xs leading-relaxed mb-2"
                          >
                            {role.description}
                          </motion.div>
                        ) : (
                          <motion.p key="short" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-300/70 text-xs line-clamp-2">
                            {role.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {expanded === i && <p className="text-amber-400/80 text-xs font-mono">{role.tech}</p>}
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === i ? null : i)}
                        className="absolute top-4 right-4 w-8 h-8 rounded flex items-center justify-center border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                        aria-label={expanded === i ? 'Collapse' : 'Expand'}
                      >
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
