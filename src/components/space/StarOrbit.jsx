import { useEffect, useMemo } from "react"

export function StarOrbit({
  countPerRing = 100,
  rings = 5,                // 🔥 jumlah ring
  baseRadius = 420,
  ringSpacing = 70,
  centerX = 0.5,
  centerY = 0.5,
}) {

  const stars = useMemo(() => {
    const arr = []
    let id = 0

    for (let r = 0; r < rings; r++) {
      const ringRadius = baseRadius + r * ringSpacing

      for (let i = 0; i < countPerRing; i++) {
        arr.push({
          id: id++,
          ring: r,
          baseAngle: (i / countPerRing) * Math.PI * 2,
          speed: 0.01 + r * 0.09,   // luar lebih lambat
          size: 0.7 + Math.random() * 1.3,
          radius: ringRadius,
          tilt: 0.8 - r * 0.04,
        })
      }
    }

    return arr
  }, [rings, countPerRing, baseRadius, ringSpacing])

  useEffect(() => {
    let raf = 0

    const tick = () => {
      const t = performance.now() * 0.001

      const cx = window.innerWidth * centerX
      const cy = window.innerHeight * centerY

      stars.forEach((s) => {
        const el = document.getElementById(`orbit-star-${s.id}`)
        if (!el) return

        const a = s.baseAngle + t * s.speed
        const x = cx + Math.cos(a) * s.radius
        // const y = cy + Math.sin(a) * s.radius * s.tilt
        const y = cy + Math.sin(a) * s.radius

        const depth = Math.sin(a)
        const scale = 0.7 + (depth + 1) * 0.25
        const opacity = 0.2 + (depth + 1) * 0.3

        el.style.transform =
          `translate(${x}px, ${y}px) scale(${scale})`

        el.style.opacity = opacity
        el.style.zIndex = depth > 0 ? 6 : 2
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [stars, centerX, centerY])

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          id={`orbit-star-${s.id}`}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(139,92,246,0.8) 45%, transparent 75%)",
            boxShadow:
              "0 0 10px rgba(139,92,246,0.7)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  )
}