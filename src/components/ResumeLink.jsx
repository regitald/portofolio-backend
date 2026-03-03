import { FileText } from 'lucide-react'

export function ResumeLink() {
  const resumeUrl = '/resume.pdf' // taruh file di public/resume.pdf atau ganti dengan link
  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/90 text-black font-medium hover:bg-amber-400 transition-colors text-sm uppercase tracking-wider md:bottom-6 md:right-8"
    >
      <span>Resume</span>
      <FileText className="h-4 w-4" />
    </a>
  )
}
