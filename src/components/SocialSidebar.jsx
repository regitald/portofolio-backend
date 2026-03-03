import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'

const links = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com', icon: Twitter, label: 'X' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
]

export function SocialSidebar() {
  return (
    <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400/80 hover:text-cyan-300 transition-colors"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}
