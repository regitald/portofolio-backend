import { useRef } from 'react'
import * as THREE from 'three'

export function Fog() {
  const ref = useRef(null)
  return (
    <mesh ref={ref} position={[0, 0, -50]}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial
        color="#1e1b4b"
        transparent
        opacity={0.12}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}
