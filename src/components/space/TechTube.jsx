import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useScroll } from '../../context/ScrollContext'
import { stackLogos } from '../../data/portfolio'

const RING_RADIUS = 12
const ICON_SIZE = 1.25
const ROW_OFFSET = 1.4

const TECH_ROTATION_BASE = 0.006
const TECH_ROTATION_SCROLL_FACTOR = Math.PI * 0.22
const LOGO_BASE = '/stack'

export function TechTube() {
  const groupRef = useRef(null)
  const opacityRef = useRef(0)
  const { scrollProgress, getProgressFor, section } = useScroll()

  const textures = useTexture(
    useMemo(() => stackLogos.map(i => `${LOGO_BASE}/${i.logo}`), [])
  )

  const icons = useMemo(() => {
    const count = stackLogos.length
    const phi = Math.PI * (3 - Math.sqrt(5))
  
    return stackLogos.map((item, i) => {
      const y = 1 - (i / (count - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i
  
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
  
      return {
        index: i,
        position: new THREE.Vector3(
          x * RING_RADIUS,
          y * RING_RADIUS * 0.95,
          z * RING_RADIUS
        ),
      }
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    // =========================
    // ⭐ SMOOTH FADE
    // =========================
    const targetOpacity = section === 'tech' ? 1 : 0
    opacityRef.current += (targetOpacity - opacityRef.current) * 0.08
    groupRef.current.visible = opacityRef.current > 0.02

    // =========================
    // ⭐ ROTATION
    // =========================
    const { start, end } = getProgressFor('tech')
    const span = end - start || 1
    const local = Math.max(0, Math.min(1, (scrollProgress - start) / span))

    const base = state.clock.elapsedTime * TECH_ROTATION_BASE
    const extra = local * TECH_ROTATION_SCROLL_FACTOR
    groupRef.current.rotation.y = base + extra

    const camPos = state.camera.position
    const time = state.clock.elapsedTime

    groupRef.current.children.forEach(child => {
      child.traverse(obj => {
        if (!obj.material) return
    
        const worldPos = new THREE.Vector3()
        obj.getWorldPosition(worldPos)
    
        const depth = worldPos.z
    
        const depthOpacity =
          depth > 0
            ? opacityRef.current
            : opacityRef.current * 0.22
    
        obj.material.opacity = depthOpacity
      })
    })

    // =========================
    // ⭐ DEPTH + FLOAT + BILLBOARD
    // =========================
    groupRef.current.children.forEach((child, i) => {
      const icon = icons[i]
      if (!icon) return

      // floating subtle
      const floatY = Math.sin(time * 0.8 + icon.floatOffset) * 0.15

      // recompute position
      const theta = icon.baseTheta
      const x = Math.cos(theta) * icon.radius
      const z = Math.sin(theta) * icon.radius

      child.position.set(x, icon.y + floatY, z)

      // ⭐ depth simulation
      const depth = Math.sin(theta + groupRef.current.rotation.y)

      const scale = 0.75 + (depth + 1) * 0.35
      const opacity =
        depth > 0
          ? opacityRef.current
          : opacityRef.current * (0.25 + (depth + 1) * 0.35)

      child.scale.setScalar(ICON_SIZE * scale)

      child.traverse(obj => {
        if (obj.material) {
          obj.material.opacity = opacity
        }
      })

      // ⭐ billboard
      child.lookAt(camPos.x, camPos.y, camPos.z)
    })
  })

  return (
    <group ref={groupRef}>
      {icons.map(icon => {
        const texture = Array.isArray(textures)
          ? textures[icon.index]
          : textures

        return (
          <mesh
            key={icon.index}
            scale={ICON_SIZE}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={texture}
              transparent
              depthWrite={false}
              toneMapped={false}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}