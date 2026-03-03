import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, ChevronLeft, Briefcase, DollarSign, HelpCircle } from 'lucide-react'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'
import chatData from '../data/chatQA.json'

const topics = [
  { id: 'latestProject', label: 'Latest project', icon: Briefcase },
  { id: 'desiredSalary', label: 'Desired salary', icon: DollarSign },
  { id: 'interviewQA', label: 'Pertanyaan interview (SWE)', icon: HelpCircle },
]

export function ChatMe() {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('menu') // 'menu' | 'answer'
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [interviewIndex, setInterviewIndex] = useState(0)

  const handleSelect = (id) => {
    if (id === 'interviewQA') {
      setSelectedTopic({ id, data: chatData.interviewQA })
      setInterviewIndex(0)
    } else {
      setSelectedTopic({ id, data: chatData[id] })
    }
    setView('answer')
  }

  const handleBack = () => {
    setView('menu')
    setSelectedTopic(null)
  }

  const currentAnswer = () => {
    if (!selectedTopic) return null
    if (selectedTopic.id === 'interviewQA') {
      const qa = chatData.interviewQA[interviewIndex]
      return { question: qa.question, answer: qa.answer, isList: true, total: chatData.interviewQA.length }
    }
    return { question: selectedTopic.data.question, answer: selectedTopic.data.answer, isList: false }
  }

  const nextInterview = () => {
    if (interviewIndex < chatData.interviewQA.length - 1) setInterviewIndex((i) => i + 1)
  }
  const prevInterview = () => {
    if (interviewIndex > 0) setInterviewIndex((i) => i - 1)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-6 z-40 w-14 h-14 rounded-full bg-cyan-500 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat Me"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm rounded-xl border border-border bg-card shadow-xl overflow-hidden flex flex-col"
            style={{ height: '480px' }}
          >
            <div className="flex items-center gap-2 p-3 border-b border-border bg-muted/50">
              {view === 'answer' && (
                <Button variant="ghost" size="icon" onClick={handleBack} aria-label="Kembali">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <span className="font-semibold">Chat Me</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => { setOpen(false); setView('menu'); setSelectedTopic(null) }}
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {view === 'menu' && (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3"
                  >
                    <p className="text-sm text-muted-foreground mb-4">Mau nanya apa?</p>
                    {topics.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelect(t.id)}
                        className={cn(
                          'w-full flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3 text-left',
                          'hover:bg-muted hover:border-foreground/20 transition-colors'
                        )}
                      >
                        <t.icon className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{t.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}

                {view === 'answer' && currentAnswer() && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Pertanyaan</p>
                      <p className="text-sm font-medium">{currentAnswer().question}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Jawaban</p>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {currentAnswer().answer}
                      </p>
                    </div>
                    {currentAnswer().isList && (
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          {interviewIndex + 1} / {currentAnswer().total}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={prevInterview} disabled={interviewIndex === 0}>
                            Prev
                          </Button>
                          <Button variant="outline" size="sm" onClick={nextInterview} disabled={interviewIndex === currentAnswer().total - 1}>
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
