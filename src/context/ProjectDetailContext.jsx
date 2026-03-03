import { createContext, useContext, useState } from 'react'

const ProjectDetailContext = createContext(null)

export function ProjectDetailProvider({ children }) {
  const [selectedProject, setSelectedProject] = useState(null)
  return (
    <ProjectDetailContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectDetailContext.Provider>
  )
}

export function useProjectDetail() {
  const ctx = useContext(ProjectDetailContext)
  return ctx || { selectedProject: null, setSelectedProject: () => {} }
}
