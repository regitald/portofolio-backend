import { useState } from 'react'
import { motion } from 'framer-motion'

const ABOUT_IMAGE = '/me.jpg'

export function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="about" className="relative py-24 px-4 min-h-screen flex flex-col md:flex-row md:items-center gap-12">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 50% 80% at 20% 50%, rgba(126, 34, 206, 0.15), transparent 50%),
            linear-gradient(180deg, hsl(240 30% 6%) 0%, hsl(260 40% 8%) 100%)
          `,
        }}
      />

      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
        {/* Kiri: Gambar (seperti ref - bust/avatar) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-shrink-0 flex justify-center md:justify-start"
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-violet-500/20 shadow-2xl">
            {!imgError ? (
              <img
                src={ABOUT_IMAGE}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : null}
            {imgError && (
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 flex items-center justify-center">
                <span className="text-white/60 text-sm">Foto (public/me.jpg)</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Kanan: ABOUT ME + bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-violet-300/90 mb-6 uppercase tracking-wide">
            About Me
          </h2>
          <p className="text-white/90 leading-relaxed max-w-xl">
            Self-taught Backend & Full-Stack Developer dari Indonesia. Fokus di Laravel, API, dan CMS;
            suka sentuhan frontend pakai React, Vue, dan Bootstrap. Prioritas clean code dan sistem yang maintainable.
            Tertarik kolaborasi dan proyek yang impactful.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
