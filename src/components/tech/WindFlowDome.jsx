import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useScroll } from "../../context/ScrollContext"

const COUNT = 6000
const AREA = 120
const SPEED_BASE = 18
const SPEED_VARIANCE = 8
const DOME_RADIUS = 30

export function WindFlowDome() {
  const pointsRef = useRef(null)
  const velocitiesRef = useRef(null)
  const baseRef = useRef(null)
  const { scrollProgress } = useScroll() // ← penting

  // init velocities
  if (!velocitiesRef.current) {
    const v = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      v[i] = SPEED_BASE + Math.random() * SPEED_VARIANCE
    }
    velocitiesRef.current = v
  }

  // init base hemisphere targets (sekali saja)
  if (!baseRef.current) {
    const targets = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(Math.random())
      const theta = 2 * Math.PI * Math.random()

      const r = DOME_RADIUS + (Math.random() - 0.5) * 0.4

      targets[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      targets[i * 3 + 1] = Math.abs(r * Math.cos(phi))
      targets[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }

    baseRef.current = targets
  }

  const positions = new Float32Array(COUNT * 3)

  // init windy start positions
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3 + 0] = -AREA + Math.random() * AREA
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6
  }

  useFrame((state) => {
    const points = pointsRef.current
    if (!points) return

    const pos = points.geometry.attributes.position.array
    const vels = velocitiesRef.current
    const targets = baseRef.current
    const dt = state.clock.getDelta()

    // remap scroll → dome influence
    const domeT = THREE.MathUtils.smoothstep(
      scrollProgress,
      0.2,
      0.95
    )

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3

      // 🌪️ phase 1 — wind flow
      pos[i3 + 0] += vels[i] * dt

      // recycle
      if (pos[i3 + 0] > AREA) {
        pos[i3 + 0] = -AREA
        pos[i3 + 1] = (Math.random() - 0.5) * 6
        pos[i3 + 2] = (Math.random() - 0.5) * 6
      }

      // 🌐 phase 2 — dome attraction (smooth)
      pos[i3 + 0] = THREE.MathUtils.lerp(pos[i3 + 0], targets[i3 + 0], domeT)
      pos[i3 + 1] = THREE.MathUtils.lerp(pos[i3 + 1], targets[i3 + 1], domeT)
      pos[i3 + 2] = THREE.MathUtils.lerp(pos[i3 + 2], targets[i3 + 2], domeT)
    }

    points.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={"#ffffff"}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}