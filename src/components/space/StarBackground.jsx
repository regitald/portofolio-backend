import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '../../context/ScrollContext'

const COUNT = 6000
const AREA = 220
const SPEED_BASE = 12
const SPEED_VARIANCE = 6

export function StarBackground() {
  const pointsRef = useRef(null)
  const velocitiesRef = useRef(null)
  const { section } = useScroll()

  // ⭐ visibility rules
  const shouldShow =
    section === 'hero' ||
    section === 'about' ||
    section === 'roles' ||
    section === 'projects' ||
    section === 'chat' ||
    section === 'contact' ||
    section === 'tech' 

  // init velocity once
  if (!velocitiesRef.current) {
    const velocities = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      velocities[i] = SPEED_BASE + Math.random() * SPEED_VARIANCE
    }
    velocitiesRef.current = velocities
  }

  const positions = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3
    positions[i3 + 0] = (Math.random() - 0.5) * AREA
    positions[i3 + 1] = (Math.random() - 0.5) * AREA
    positions[i3 + 2] = -Math.random() * AREA * 2 - 40
  }

  useFrame((state) => {
    const points = pointsRef.current
    if (!points) return

    // 🔥 toggle visibility
    points.visible = shouldShow
    if (!shouldShow) return

    const pos = points.geometry.attributes.position.array
    const vels = velocitiesRef.current
    const dt = state.clock.getDelta()

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      pos[i3 + 2] += vels[i] * dt

      if (pos[i3 + 2] > 10) {
        pos[i3 + 2] = -AREA * 2 - 40
        pos[i3 + 0] = (Math.random() - 0.5) * AREA
        pos[i3 + 1] = (Math.random() - 0.5) * AREA
      }
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
        color={0xffffff}
        size={0.30}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}