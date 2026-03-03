import { motion } from "framer-motion"

const projects = [
  {
    id: "01",
    title: "AI Orchestration Platform",
    desc: "Built scalable AI orchestration systems integrating LLM agents, distributed inference services, and real-time monitoring dashboards.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Active System Automation",
    desc: "Developed backend automation pipelines for processing high-volume transactional data with optimized performance layers.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Space Traffic Analytics",
    desc: "Designed real-time tracking dashboards with advanced data visualization and multi-source telemetry aggregation.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Cloud Infrastructure System",
    desc: "Architected container-based infrastructure with CI/CD pipelines, horizontal scaling, and high-availability design.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "Blockchain Voting Platform",
    desc: "Implemented decentralized voting logic using smart contracts, secure identity validation, and audit transparency layers.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
  },
  {
    id: "06",
    title: "Data Intelligence Engine",
    desc: "Built analytics systems with predictive modeling, data streaming pipelines, and scalable storage architecture.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
  },
  {
    id: "07",
    title: "Enterprise CMS Platform",
    desc: "Created modular CMS framework with role-based access control, API-first design, and multilingual capabilities.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
  },
]

export function ProjectsSection() {
  return (
    <section
      className="absolute left-0 right-0 px-10 md:px-20"
      style={{ top: "600vh" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-24 tracking-tight">
          My <span className="text-indigo-400">Projects</span>
        </h2>

        <div className="space-y-28">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="border-b border-white/10 pb-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                
                {/* IMAGE + FLOATING GLOW */}
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.15,
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, amount: 0.6 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>

                  <img
                    src={p.image}
                    alt={p.title}
                    className="relative w-full h-[240px] object-cover rounded-md opacity-90 group-hover:opacity-100 transition duration-700 group-hover:scale-[1.04]"
                  />
                </motion.div>

                {/* NUMBER + TITLE */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.15 + 0.1,
                      duration: 1.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-white/40 text-xl mb-6 font-mono tracking-widest"
                  >
                    {p.id}
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.15 + 0.2,
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-3xl md:text-4xl text-white font-light leading-tight"
                  >
                    {p.title}
                  </motion.h3>
                </div>

                {/* DESCRIPTION */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.15 + 0.35,
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, amount: 0.6 }}
                >
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-md">
                    {p.desc}
                  </p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}