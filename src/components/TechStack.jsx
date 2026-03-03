import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Code2,
  Database,
  Server,
  Palette,
  Box,
  GitBranch,
  Container,
  Terminal,
  FileCode,
  PenTool,
  Send,
} from 'lucide-react'

/* ================= ROBOTIC TYPING ================= */

const typingLines = [
  'Backend: Laravel, REST API, GraphQL, Node.js (Express), Go (basic microservices)',
  'Database & Search: MySQL, SQL Server, MongoDB (basic), Redis, Meilisearch',
  'Frontend: React, Vue.js, HTML, CSS, Bootstrap, Blade',
  'DevOps & Tools: GitHub, GitLab, CI/CD pipeline usage, Sentry, Laravel Horizon, AWS S3, Postman',
  'AI-Assisted Development: Cursor AI, OpenAPI-based content generation',
]

function TechTypingBlock() {
  const [displayed, setDisplayed] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const line = typingLines[lineIndex]

    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + line[charIndex])
        setCharIndex((c) => c + 1)
      }, 16)
      return () => clearTimeout(t)
    }

    const next = setTimeout(() => {
      setDisplayed((p) => p + '\n')
      setLineIndex((i) => (i + 1) % typingLines.length)
      setCharIndex(0)
    }, 900)

    return () => clearTimeout(next)
  }, [charIndex, lineIndex])

  return (
    <div
      className="mx-auto mb-10 max-w-3xl rounded-xl border border-cyan-400/20 bg-black/40 backdrop-blur-md px-6 py-5"
      style={{ boxShadow: '0 0 40px rgba(34,211,238,0.08)' }}
    >
      <pre className="text-left text-cyan-200/90 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
        {displayed}
        <span className="animate-pulse text-cyan-300">▌</span>
      </pre>
    </div>
  )
}

/* ================= ICON ================= */

function AtomIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

/* ================= DATA ================= */

const techList = [
  'PHP',
  'Laravel',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'React',
  'Vue.js',
  'Bootstrap',
  'Tailwind CSS',
  'Node.js',
  'REST API',
  'MySQL',
  'PostgreSQL',
  'Redis',
  'Git',
  'GitHub',
  'Docker',
  'Linux',
  'VS Code',
  'Figma',
  'Postman',
]

const techIcons = {
  PHP: Server,
  Laravel: Box,
  JavaScript: Code2,
  TypeScript: Code2,
  React: AtomIcon,
  'Vue.js': Code2,
  'Tailwind CSS': Palette,
  'REST API': Send,
  MySQL: Database,
  PostgreSQL: Database,
  Redis: Database,
  Git: GitBranch,
  GitHub: GitBranch,
  Docker: Container,
  Linux: Terminal,
  'VS Code': FileCode,
  Figma: PenTool,
  Postman: Send,
}

const CARD_WIDTH = 180
const CARD_GAP = 24
const TOTAL_WIDTH = techList.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP

/* ================= MAIN ================= */

export function TechStack() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [
      0,
      -TOTAL_WIDTH * 0.25,
      -TOTAL_WIDTH * 0.5,
      -TOTAL_WIDTH * 0.75,
      -Math.max(TOTAL_WIDTH - 1200, 0),
    ]
  )

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden"
      style={{ height: '200vh' }}
    >
      {/* background */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: '#030305' }}
      />

      <div
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(100,116,139,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100,116,139,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* nebula */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-25 blur-[150px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(234,88,12,0.4) 0%, transparent 60%)',
        }}
      />

      <div
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 60%)',
        }}
      />

      <div className="sticky top-0 h-screen flex flex-col justify-center pt-20 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 md:mb-8 z-10"
        >
          {/* TECH STACK */}
        </motion.h2>

        {/* 🔥 ROBOTIC TYPING */}
        <div className="relative z-10">
        <TechTypingBlock />
      </div>

        {/* strip */}
        <div
          className="flex justify-center w-full overflow-hidden"
          style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
        >
          <motion.div
            style={{ x }}
            className="flex items-center gap-6 will-change-transform"
          >
            {techList.map((tech, i) => {
              const Icon = techIcons[tech] || null
              const centerIndex = techList.length / 2
              const angle = (i - centerIndex) * 5

              return (
                <motion.div
                  key={tech}
                  className="flex-shrink-0 w-[180px] rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/40"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${angle}deg)`,
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-cyan-200">
                    {Icon ? (
                      <Icon className="w-7 h-7" />
                    ) : (
                      <span className="font-mono font-bold text-lg">
                        {tech.charAt(0)}
                      </span>
                    )}
                  </div>

                  <span className="text-white font-medium text-sm text-center leading-tight">
                    {tech}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <p className="text-center text-slate-400/70 text-sm mt-6 z-10">
          Scroll untuk melihat lebih banyak
        </p>
      </div>
    </section>
  )
}