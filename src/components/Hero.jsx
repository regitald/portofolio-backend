import { useState } from 'react'
import { motion } from 'framer-motion'

const HERO_IMAGE = '/me.jpg'

export function Hero() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="home" className="min-h-screen relative flex items-center px-4 pt-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 70% 50%, rgba(88, 28, 135, 0.25), transparent 50%),
            radial-gradient(ellipse 60% 80% at 20% 90%, rgba(126, 34, 206, 0.15), transparent 45%),
            linear-gradient(180deg, hsl(260 40% 8%) 0%, hsl(240 30% 6%) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
        {/* Kiri: Hello I'm + Nama */}
        <div className="text-center md:text-left order-1">
          <p className="text-violet-300/90 mb-1 font-mono text-sm">Hello! I&apos;m</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
            Your Name
          </h1>
        </div>

        {/* Tengah: Gambar */}
        <div className="flex justify-center order-3 md:order-2">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-violet-500/20 shadow-2xl shadow-violet-900/30">
            {!imgError ? (
              <img
                src={HERO_IMAGE}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : null}
            {imgError && (
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 flex items-center justify-center">
                <span className="text-white/60 text-xs text-center px-2">Foto (public/me.jpg)</span>
              </div>
            )}
          </div>
        </div>

        {/* Kanan: An + Role (seperti ref) */}
        <div className="text-center md:text-right order-2 md:order-3">
          <p className="text-white/90 text-sm md:text-base mb-1">An</p>
          <p className="text-violet-400 font-semibold text-xl md:text-2xl mb-0.5">Backend Developer</p>
          <p className="text-white font-bold text-2xl md:text-3xl uppercase tracking-tight">
            Full-Stack Dev
          </p>
        </div>
      </div>
    </section>
  )
}
