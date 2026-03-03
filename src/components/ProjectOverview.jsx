import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  { title: 'CMS Laravel', desc: 'Custom CMS dengan auth, roles, dan CRUD. Dashboard + API.', stack: 'Laravel · MySQL', link: '#', github: '#', image: null },
  { title: 'REST API', desc: 'API untuk mobile/web. Auth JWT, validation, documentation.', stack: 'Laravel · PostgreSQL', link: '#', github: '#', image: null },
  { title: 'Portfolio', desc: 'Landing page React + Tailwind. Dark theme, animasi scroll.', stack: 'React · Vite', link: '#', github: '#', image: null },
  { title: 'Project D', desc: 'Deskripsi singkat project kamu.', stack: 'Tech stack', link: '#', github: '#', image: null },
]

export function ProjectOverview() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const x = useTransform(scrollYProgress, (v) => `${-v * (projects.length - 1) * 100}vw`)

  return (
    <section
      ref={sectionRef}
      id="projects-overview"
      className="relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full w-max"
        >
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="relative flex-shrink-0 w-screen h-full flex items-center justify-center"
            >
              {/* Full-bleed: luar angkasa (nebula merah/oranye & ungu) */}
              <div className="absolute inset-0 bg-[var(--space-bg-deep)]">
                {p.image ? (
                  <img src={p.image} alt="" className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background: `radial-gradient(ellipse 80% 80% at ${50 + (i % 3) * 15}% 50%, rgba(34, 211, 238, 0.2), transparent 50%),
                        radial-gradient(ellipse 60% 60% at 30% 70%, rgba(251, 191, 36, 0.15), transparent 40%)`,
                    }}
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-black/30" />

              {/* Konten overlay — bawah kiri seperti referensi */}
              <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 text-left flex flex-col justify-end pb-24 md:pb-32 min-h-full">
                <div className="mt-auto">
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
                    {p.title}
                  </h3>
                  <p className="text-slate-200/90 text-lg md:text-xl max-w-xl mb-4">
                    {p.desc}
                  </p>
                  <p className="text-cyan-400/80 text-sm font-mono mb-6">{p.stack}</p>
                  <div className="flex gap-3">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" /> Demo
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan-400/60 text-cyan-200 hover:bg-cyan-500/20 transition-colors"
                    >
                      <Github className="h-4 w-4" /> Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
