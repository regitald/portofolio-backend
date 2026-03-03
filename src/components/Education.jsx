import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const timeline = [
  {
    period: '20XX - 20XX',
    title: 'Jurusan / Gelar',
    place: 'Nama Universitas atau Bootcamp',
  },
  {
    period: '20XX - 20XX',
    title: 'SMA / SMK',
    place: 'Nama Sekolah',
  },
]

export function Education() {
  return (
    <section id="education" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--space-bg-deep)]" />
      {/* Grid + garis luar angkasa biar tidak monoton */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-[80px] -z-10 pointer-events-none" />
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Education & Journey</h2>
          <p className="text-cyan-200/80">
            Latar pendidikan dan perjalanan belajar.
          </p>
        </motion.div>

        <div className="space-y-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-cyan-300/80 font-mono">{item.period}</p>
                <h3 className="font-semibold mt-1 text-white">{item.title}</h3>
                <p className="text-cyan-200/80 text-sm">{item.place}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
