// components/space/TechOrbitSphere.jsx
import { useEffect, useMemo } from 'react'

export function TechOrbitSphere({
  items = [],
  radius = 220,
  centerX = 0.5,
  centerY = 0.55,
}) {
  const nodes = useMemo(
    () =>
      items.map((label, i) => ({
        id: i,
        label,
        baseAngle: (i / items.length) * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.25,
        size: 6 + Math.random() * 4,
        tilt: 0.7 + Math.random() * 0.25,
      })),
    [items]
  )

  useEffect(() => {
    let raf = 0

    const tick = () => {
      const t = performance.now() * 0.001

      const cx = window.innerWidth * centerX
      const cy = window.innerHeight * centerY

      nodes.forEach((n) => {
        const el = document.getElementById(`tech-orbit-${n.id}`)
        if (!el) return

        const a = n.baseAngle + t * n.speed

        const x = cx + Math.cos(a) * radius
        const y = cy + Math.sin(a) * radius * n.tilt

        // ⭐ depth simulation
        const depth = Math.sin(a)

        const scale = 0.55 + (depth + 1) * 0.25
        const opacity =
          depth > 0
            ? 0.95
            : 0.15 + (depth + 1) * 0.35

        const glow = depth > 0 ? 1 : 0.4

        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
        el.style.opacity = opacity
        el.style.filter = `blur(${depth < -0.2 ? 1.5 : 0}px)`
        el.style.zIndex = depth > 0 ? 8 : 3
        el.style.boxShadow = `0 0 ${8 * glow}px rgba(99,102,241,${0.6 * glow})`
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [nodes, radius, centerX, centerY])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {nodes.map((n) => (
        <div
          key={n.id}
          id={`tech-orbit-${n.id}`}
          className="absolute rounded-full"
          style={{
            width: n.size,
            height: n.size,
            background:
              'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(99,102,241,0.9) 40%, transparent 70%)',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}