import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const socials = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:you@example.com', icon: Mail, label: 'Email' },
]

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 border-t border-white/10 relative">
      <div className="absolute inset-0 -z-10 bg-[var(--space-bg-deep)]" />
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs text-slate-400/70">
          © {new Date().getFullYear()} Regita Lisgiani. Built with React + Tailwind.
        </p>
      </div>
    </footer>
  )
}
