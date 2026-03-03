import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'

const projects = [
  {
    title: 'CMS Laravel',
    desc: 'Custom CMS dengan auth, roles, dan CRUD. Dashboard + API.',
    stack: ['Laravel', 'MySQL', 'Bootstrap'],
    link: '#',
    github: '#',
  },
  {
    title: 'REST API Project',
    desc: 'API untuk mobile/web. Auth JWT, validation, documentation.',
    stack: ['Laravel', 'PostgreSQL', 'Swagger'],
    link: '#',
    github: '#',
  },
  {
    title: 'Portfolio / Landing',
    desc: 'Landing page atau admin panel kecil pakai React + Tailwind.',
    stack: ['React', 'Tailwind', 'Vite'],
    link: '#',
    github: '#',
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--space-bg-deep)]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(34,211,238,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-[100px] -z-10 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Projects</h2>
          <p className="text-slate-300/80 max-w-xl mx-auto">
            Beberapa proyek backend & fullstack yang pernah dikerjakan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 56, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Card className="h-full flex flex-col overflow-hidden border border-white/10 bg-white/5 hover:border-cyan-500/30 transition-colors group">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col pt-0">
                  <p className="text-sm text-slate-300/80 mb-4 flex-1">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-1 rounded-md bg-white/10 text-cyan-200 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/20">
                        <ExternalLink className="h-3.5 w-3.5" /> Demo
                      </Button>
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="gap-1 text-cyan-200 hover:bg-white/10">
                        <Github className="h-3.5 w-3.5" /> Code
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
