import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'

const fakeReplies = [
  "Hai! Saya AI asisten portofolio (simulasi). Kamu bisa tanya apa aja tentang pemilik portofolio ini — nanti diisi response yang relevan.",
  "Pemilik situs ini suka backend (Laravel) dan sedikit frontend (React/Vue). Tertarik kolaborasi? Cek section Contact.",
  "Ini cuma demo chat. Untuk chat beneran, bisa integrasi OpenAI/API nanti.",
  "Terima kasih sudah mampir! Jangan lupa cek bagian Projects untuk lihat karya-karyanya.",
]

function getFakeReply() {
  return fakeReplies[Math.floor(Math.random() * fakeReplies.length)]
}

export function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hai! Ada yang bisa saya bantu? (Ini chat simulasi — jawaban random.)' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: getFakeReply() }])
    }, 600)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Tanya AI"
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
            style={{ height: '420px' }}
          >
            <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-semibold">Tanya AI</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Tutup">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex gap-2',
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.role === 'bot' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[85%] rounded-lg px-3 py-2 text-sm',
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Tanya sesuatu..."
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button size="icon" onClick={send} aria-label="Kirim">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
