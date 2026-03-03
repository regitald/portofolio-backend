import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { stackLogos } from '../../data/portfolio'

const ORBIT_RADIUS = 11.5
const ICON_SIZE = 1.25

export function TechOrbitLogos() {
  const groupRef = useRef()

  const textures = useTexture(
    useMemo(() => stackLogos.map(i => `/stack/${i.logo}`), [])
  )

  const items = useMemo(() => {
    return stackLogos.map((_, i) => {
      const a = (i / stackLogos.length) * Math.PI * 2

      return new THREE.Vector3(
        Math.cos(a) * ORBIT_RADIUS,
        Math.sin(a * 0.7) * 1.6, // ⭐ oval orbit
        Math.sin(a) * ORBIT_RADIUS
      )
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y += 0.0025

    const cam = state.camera.position
    groupRef.current.children.forEach((c) =>
      c.lookAt(cam.x, cam.y, cam.z)
    )
  })

  return (
    <group ref={groupRef}>
      {items.map((pos, i) => {
        const tex = Array.isArray(textures) ? textures[i] : textures

        return (
          <mesh key={i} position={pos} scale={ICON_SIZE}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={tex}
              transparent
              depthWrite={false}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}