import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function RedEnergySphere({
  radius = 4,
  count = 14000,
}) {
  const pointsRef = useRef()

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const color = new THREE.Color()

    for (let i = 0; i < count; i++) {
      // 🔥 radial turbulence (break perfect sphere)
      const noise = (Math.random() - 0.5) * 0.6
      const r = radius + noise

      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      // 🔥 uneven energy coloring (more organic)
      const t = Math.random()
      if (t < 0.6) {
        color.set("#ff2a2a") // deep red
      } else if (t < 0.85) {
        color.set("#ff4d2e") // orange
      } else {
        color.set("#ffb347") // yellow hotspot
      }

      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }

    return { positions: pos, colors: col }
  }, [count, radius])

  useFrame((state) => {
    if (!pointsRef.current) return

    const t = state.clock.getElapsedTime()

    // slow cinematic rotation (NOT spinning fast)
    pointsRef.current.rotation.y += 0.0006
    pointsRef.current.rotation.x += 0.0002

    // breathing energy pulse
    const pulse = 1 + Math.sin(t * 1.2) * 0.05
    pointsRef.current.scale.setScalar(pulse)

    // subtle vertical wobble (break perfect sphere feel)
    pointsRef.current.position.y = Math.sin(t * 0.8) * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}