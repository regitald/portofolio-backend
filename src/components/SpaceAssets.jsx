import { useMemo } from 'react'

// Planet: gradient circle (bulan/planet jauh)
function Planet({ size, left, top, color = 'cyan', opacity = 0.15 }) {
  const gradient = color === 'cyan'
    ? 'radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.4), transparent 70%)'
    : 'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.25), transparent 70%)'
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        opacity,
        background: gradient,
        filter: 'blur(1px)',
      }}
      aria-hidden
    />
  )
}

// Asteroid / batu: bentuk tidak beraturan (border-radius acak)
function Asteroid({ width, height, left, top, opacity = 0.12 }) {
  return (
    <div
      className="absolute pointer-events-none bg-cyan-500/30 rounded-[40% 60% 70% 30% / 40% 50% 60% 50%]"
      style={{
        width,
        height,
        left: `${left}%`,
        top: `${top}%`,
        opacity,
        filter: 'blur(2px)',
      }}
      aria-hidden
    />
  )
}

// Garis-garis di luar angkasa (cosmic rays / grid lines)
function SpaceLine({ length, left, top, rotation, delay = 0 }) {
  return (
    <div
      className="absolute pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
      style={{
        width: length,
        height: 1,
        left: `${left}%`,
        top: `${top}%`,
        transform: `rotate(${rotation}deg)`,
        animation: `spaceLinePulse 4s ease-in-out ${delay}s infinite`,
      }}
      aria-hidden
    />
  )
}

export function SpaceAssets() {
  const planets = useMemo(() => [
    { size: 120, left: 85, top: 15, color: 'cyan', opacity: 0.12 },
    { size: 80, left: 10, top: 70, color: 'amber', opacity: 0.1 },
    { size: 200, left: 70, top: 80, color: 'cyan', opacity: 0.08 },
    { size: 60, left: 5, top: 25, color: 'cyan', opacity: 0.14 },
    { size: 100, left: 90, top: 55, color: 'amber', opacity: 0.09 },
  ], [])

  const asteroids = useMemo(() => [
    { w: 8, h: 6, left: 20, top: 40, opacity: 0.2 },
    { w: 12, h: 8, left: 75, top: 30, opacity: 0.15 },
    { w: 6, h: 5, left: 50, top: 85, opacity: 0.18 },
    { w: 10, h: 7, left: 88, top: 75, opacity: 0.12 },
    { w: 5, h: 4, left: 15, top: 80, opacity: 0.22 },
    { w: 7, h: 6, left: 60, top: 20, opacity: 0.16 },
  ], [])

  const lines = useMemo(() => [
    { id: 0, length: 140, left: 5, top: 10, rotation: -25, delay: 0 },
    { id: 1, length: 180, left: 70, top: 15, rotation: 20, delay: 0.5 },
    { id: 2, length: 100, left: 20, top: 60, rotation: 45, delay: 1 },
    { id: 3, length: 160, left: 80, top: 70, rotation: -40, delay: 0.2 },
    { id: 4, length: 120, left: 0, top: 85, rotation: 10, delay: 1.2 },
    { id: 5, length: 90, left: 50, top: 5, rotation: -55, delay: 0.8 },
    { id: 6, length: 200, left: 30, top: 40, rotation: 15, delay: 0.3 },
    { id: 7, length: 110, left: 90, top: 50, rotation: -30, delay: 1.5 },
    { id: 8, length: 130, left: 10, top: 35, rotation: 50, delay: 0.6 },
    { id: 9, length: 95, left: 60, top: 90, rotation: -15, delay: 1.1 },
    { id: 10, length: 170, left: 85, top: 25, rotation: 35, delay: 0.4 },
    { id: 11, length: 85, left: 40, top: 75, rotation: -50, delay: 0.9 },
  ], [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {planets.map((p, i) => (
        <Planet key={`p-${i}`} size={p.size} left={p.left} top={p.top} color={p.color} opacity={p.opacity} />
      ))}
      {asteroids.map((a, i) => (
        <Asteroid key={`a-${i}`} width={a.w} height={a.h} left={a.left} top={a.top} opacity={a.opacity} />
      ))}
      {lines.map((l) => (
        <SpaceLine key={`l-${l.id}`} length={l.length} left={l.left} top={l.top} rotation={l.rotation} delay={l.delay} />
      ))}
    </div>
  )
}
