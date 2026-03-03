import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { useProjectDetail } from '../context/ProjectDetailContext'

const placeholderPreview = 'https://placehold.co/800x400/1e293b/475569?text=Preview'

export function ProjectDetailModal() {
  const { selectedProject, setSelectedProject } = useProjectDetail()

  return (
    <AnimatePresence>
      {selectedProject && (
        <ProjectDetailOverlay
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </AnimatePresence>
  )
}

function ProjectDetailOverlay({ project, onClose }) {
  const previewSrc = project.preview || placeholderPreview

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      style={{ pointerEvents: 'auto' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="rounded-3xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col"
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          boxShadow: '0 0 60px rgba(99, 102, 241, 0.15), 0 25px 80px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-shrink-0 h-48 md:h-56 bg-slate-900">
          <img
            src={previewSrc}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = placeholderPreview }}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {project.title}
          </h3>
          <p className="text-slate-200 leading-relaxed mb-6">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {(project.stack || []).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#a5b4fc',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white bg-indigo-500/40 border border-indigo-400/50 hover:bg-indigo-500/60 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Open project
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
