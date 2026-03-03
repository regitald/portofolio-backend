import { useMemo } from 'react'

const COUNT = 120
const sizes = [1, 1.5, 2]

const colors = ['bg-white', 'bg-blue-100', 'bg-amber-100']

export function Stars() {
  const dots = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className={`absolute rounded-full ${d.color} opacity-90`}
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animation: `twinkle ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
