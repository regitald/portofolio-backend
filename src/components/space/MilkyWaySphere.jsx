import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const COUNT = 12000
const RADIUS = 120

export function MilkyWaySphere() {
  const pointsRef = useRef(null)
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = RADIUS * (0.6 + Math.random() * 0.4)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = 0.5 + Math.random() * 1.5
    }
    return { positions, sizes }
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#a5b4fc"
        vertexColors={false}
      />
    </points>
  )
}
