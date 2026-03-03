import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import chatData from '../data/chatQA.json'
import { useScroll } from '../context/ScrollContext'
import { cn } from '../lib/utils'

const buildTopics = () => {
  const list = [
    { id: 'latestProject', label: 'Latest project', q: chatData.latestProject?.question, a: chatData.latestProject?.answer },
    { id: 'desiredSalary', label: 'Desired salary', q: chatData.desiredSalary?.question, a: chatData.desiredSalary?.answer },
  ]
  ;(chatData.interviewQA || []).forEach((qa, i) => {
    list.push({ id: `q${i}`, label: (qa.question || '').slice(0, 28) + '…', q: qa.question, a: qa.answer })
  })
  return list
}
const topics = buildTopics()

export function ChatSection() {
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [displayed, setDisplayed] = useState('')
  const [cursorOn, setCursorOn] = useState(true)
  const { section } = useScroll()

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 520)
    return () => clearInterval(id)
  }, [])

  const send = (q, a) => {
    setMessages((m) => [...m, { role: 'user', text: q }])
    setTyping(true)
    setDisplayed('')
    let idx = 0
    const delay = 26
    const start = Date.now() + 260
    const typeLoop = () => {
      const now = Date.now()
      if (now < start) {
        requestAnimationFrame(typeLoop)
        return
      }
      if (idx <= a.length) {
        setDisplayed(a.slice(0, idx))
        idx++
        setTimeout(typeLoop, delay)
      } else {
        setTyping(false)
        setMessages((m) => [...m, { role: 'bot', text: a }])
      }
    }
    typeLoop()
  }

  if (section !== 'chat') return null

  return (
    <section
      className="absolute left-0 right-0 flex flex-col justify-center items-center px-6"
      style={{ top: '770vh', height: '120vh', pointerEvents: 'auto' }}
      aria-label="Chat"
    >
      <div
        className="
          chat-panel-space
          relative
          rounded-3xl
          w-full
          max-w-2xl
          overflow-hidden
          backdrop-blur-xl
          bg-white/5
          border border-white/10
          shadow-[0_0_80px_rgba(99,102,241,0.15)]
        "
      >
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-white/10">
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Ask Me Anything
          </h2>
          <p className="text-slate-400 text-xs mt-1 tracking-wide">
            interactive portfolio assistant · choose a prompt
          </p>
        </div>
  
        {/* MESSAGE AREA */}
        <div className="p-6 min-h-[260px] max-h-[340px] overflow-y-auto space-y-4 text-sm">
          <AnimatePresence mode="sync">
            {messages.length === 0 && (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-400 text-sm"
              >
                Select a topic below to begin.
              </motion.p>
            )}
  
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={cn(
                  'rounded-2xl px-4 py-3 max-w-[85%] leading-relaxed border backdrop-blur-md',
                  msg.role === 'user'
                    ? 'ml-auto border-indigo-400/30 bg-indigo-500/10 text-indigo-100'
                    : 'border-white/10 bg-white/5 text-slate-200'
                )}
              >
                {msg.text}
              </motion.div>
            ))}
  
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="
                  rounded-2xl
                  px-4 py-3
                  bg-white/5
                  border border-white/10
                  text-slate-200
                  max-w-[85%]
                  backdrop-blur-md
                  whitespace-pre-wrap
                "
              >
                {displayed}
                <span className="inline-block w-2 ml-1">
                  {cursorOn ? '▌' : ' '}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  
        {/* CHIPS */}
        <div className="p-6 border-t border-white/10 flex flex-wrap gap-3">
          {topics.slice(0, 6).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => t.q && t.a && send(t.q, t.a)}
              className="
                text-xs px-4 py-2 rounded-full
                border border-white/10
                bg-white/5
                text-slate-300
                hover:bg-indigo-500/20
                hover:border-indigo-400/40
                hover:text-white
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]
              "
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
