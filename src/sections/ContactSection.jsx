import { useScroll } from '../context/ScrollContext'
import { contactLinks } from '../data/portfolio'

export function ContactSection() {
  const { section } = useScroll()
  if (section !== 'contact') return null

  return (
    <section
      className="absolute left-0 left-0 flex items-center justify-end px-6"
      style={{ top: '890vh', height: '120vh', pointerEvents: 'auto' }}
      aria-label="Contact Me"
    >
      {/* 🔥 RIGHT FLOATING PANEL (lebih kecil & elegant) */}
      <div
        className="w-full max-w-xl mr-[6vw] rounded-3xl p-8 md:p-10"
        style={{
          background: 'rgba(15, 23, 42, 0.72)',
          backdropFilter: 'blur(26px)',
          WebkitBackdropFilter: 'blur(26px)',
          border: '1px solid rgba(99, 102, 241, 0.18)',
          boxShadow:
            '0 0 80px rgba(99,102,241,0.12), 0 25px 60px rgba(0,0,0,0.45)',
        }}
      >
        {/* title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          Contact
        </h2>

        {/* desc (lebih simple) */}
        <p className="text-slate-400 mb-6 text-sm md:text-base max-w-md">
          Open to collaboration and freelance opportunities.
        </p>

        {/* email CTA */}
        <a
          href={`mailto:${contactLinks.email}`}
          className="inline-block px-6 py-3 rounded-2xl font-medium text-white text-sm
            bg-indigo-500/25 border border-indigo-400/40
            hover:bg-indigo-500/40 hover:border-indigo-400/60
            hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]
            transition-all duration-300 w-fit"
        >
          {contactLinks.email}
        </a>

        {/* socials */}
        <div className="flex gap-6 mt-6 text-sm text-slate-400">
          <a
            href={contactLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={contactLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/regitald"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>

        {/* info minimal */}
        <div className="mt-8 space-y-3 text-sm">
          <InfoRow label="Phone" value="+62 821-2741-5077" />
          <InfoRow label="Location" value="Bandung, Indonesia" />
          <InfoRow label="Timezone" value="GMT +7" />
        </div>
      </div>
    </section>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  )
}