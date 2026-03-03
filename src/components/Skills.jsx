import { motion } from 'framer-motion'

const skills = {
  Backend: ['Laravel', 'PHP', 'REST API', 'MySQL', 'PostgreSQL'],
  Frontend: ['React', 'Vue.js', 'Bootstrap', 'Tailwind CSS'],
  Tools: ['Git', 'Docker', 'Linux', 'VS Code'],
}

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fokus backend dengan sentuhan frontend. Suka kolaborasi dan bikin sistem yang scalable.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-background p-6"
            >
              <h3 className="font-semibold mb-4 text-foreground">{category}</h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((skill, j) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * j }}
                    className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
