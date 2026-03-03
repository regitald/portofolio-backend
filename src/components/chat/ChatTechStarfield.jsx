import { useMemo } from 'react'

export function ChatTechStarfield({ active }) {
  const skills = [
    'Laravel', 'Node.js', 'Go', 'REST', 'GraphQL',
    'OpenAPI', 'MySQL', 'PostgreSQL', 'Redis',
    'Meilisearch', 'React', 'Vue', 'AWS S3',
    'CI/CD', 'GitHub', 'GitLab', 'Midtrans',
    'SMTP', 'Lumen', 'Express'
  ]

  const items = useMemo(() => {
    return new Array(60).fill(0).map((_, i) => ({
      id: i,
      text: skills[Math.floor(Math.random() * skills.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 30 + Math.random() * 4,
      duration: 40 + Math.random() * 40,
      delay: Math.random() * 40,
      drift: (Math.random() - 0.5) * 40
    }))
  }, [])

  if (!active) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute text-white/5 whitespace-nowrap"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: item.size,
            animation: `techFloat ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
            transform: `translateX(${item.drift}px)`
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  )
}