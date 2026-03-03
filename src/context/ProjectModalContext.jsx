import { createContext, useContext, useState } from 'react'

const ProjectModalContext = createContext(null)

export function ProjectModalProvider({ children }) {
  const [selectedProject, setSelectedProject] = useState(null)
  return (
    <ProjectModalContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectModalContext.Provider>
  )
}

export function useProjectModal() {
  const ctx = useContext(ProjectModalContext)
  if (!ctx) throw new Error('useProjectModal must be used within ProjectModalProvider')
  return ctx
}
