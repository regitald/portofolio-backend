import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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

export function WhatIDo() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="work" className="relative py-24 px-4 min-h-screen flex flex-col justify-center">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(88, 28, 135, 0.2), transparent 50%),
            linear-gradient(180deg, hsl(260 40% 8%) 0%, hsl(240 30% 6%) 100%)
          `,
        }}
      />

      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 md:mb-16 uppercase tracking-tight"
        >
          What I Do
        </motion.h2>

        <div className="space-y-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Dashed border (viewfinder style seperti ref) */}
              <div
                className="absolute inset-0 rounded-lg pointer-events-none border-2 border-dashed border-violet-500/40"
                style={{ padding: '2px' }}
              />
              <div
                className="relative rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 pr-14"
                style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.08)' }}
              >
                <h3 className="text-2xl font-bold text-white mb-1">{role.title}</h3>
                <p className="text-violet-300/90 text-sm mb-4">{role.subtitle}</p>
                <AnimatePresence mode="wait">
                  {expanded === i ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-violet-200/90 text-sm leading-relaxed mb-3"
                    >
                      {role.description}
                    </motion.div>
                  ) : (
                    <motion.p
                      key="short"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-violet-200/70 text-sm line-clamp-2"
                    >
                      {role.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                {expanded === i && (
                  <p className="text-violet-400/80 text-xs font-mono">{role.tech}</p>
                )}
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="absolute top-6 right-6 w-9 h-9 rounded flex items-center justify-center border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                  aria-label={expanded === i ? 'Collapse' : 'Expand'}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expanded === i ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
