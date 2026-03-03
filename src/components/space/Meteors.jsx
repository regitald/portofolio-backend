import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScroll } from '../../context/ScrollContext'

const VIEW_X = 40
const METEOR_COUNT = 6

function createMeteorTexture() {
  const w = 512
  const h = 128
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')

  const grad = ctx.createLinearGradient(0, h / 2, w, h / 2)
  grad.addColorStop(0, 'rgba(255,255,220,1)')
  grad.addColorStop(0.15, 'rgba(255,200,80,0.95)')
  grad.addColorStop(0.4, 'rgba(255,120,40,0.6)')
  grad.addColorStop(1, 'rgba(255,80,0,0)')

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

export function Meteors() {
  const groupRef = useRef(null)
  const { section } = useScroll()
  const texture = useMemo(() => createMeteorTexture(), [])

  const meteorsRef = useRef(
    Array.from({ length: METEOR_COUNT }).map(() => {
      const speed = 20 + Math.random() * 10
      const scale = 2 + Math.random() * 1.5
      const yLane = -12 + Math.random() * 24
      const z = -24 - Math.random() * 10
      const dir = Math.random() > 0.5 ? -1 : 1
      return {
        x: VIEW_X * dir,
        y: yLane,
        z,
        vx: -dir * speed * 0.09,
        vy: -speed * 0.02,
        scale,
        angle: dir > 0 ? -0.25 : -Math.PI + 0.25,
        life: Math.random(),
        stretch: 6 + Math.random() * 3,
      }
    })
  )

  useFrame((state) => {
    if (!groupRef.current) return

    const show =
      section === 'hero' ||
      section === 'tech' ||
      section === 'chat'

    groupRef.current.visible = show
    if (!show) return

    const dt = state.clock.getDelta()
    const children = groupRef.current.children

    meteorsRef.current.forEach((m, idx) => {
      m.x += m.vx * dt
      m.y += m.vy * dt
      m.life += dt * 0.5

      if (m.x < -VIEW_X - 12 || m.x > VIEW_X + 12 || m.y < -24) {
        const speed = 20 + Math.random() * 10
        const scale = 2 + Math.random() * 1.5
        const yLane = -12 + Math.random() * 24
        const z = -24 - Math.random() * 10
        const dir = Math.random() > 0.5 ? -1 : 1
        m.x = VIEW_X * dir
        m.y = yLane
        m.z = z
        m.vx = -dir * speed * 0.09
        m.vy = -speed * 0.02
        m.scale = scale
        m.angle = dir > 0 ? -0.25 : -Math.PI + 0.25
        m.life = 0
        m.stretch = 6 + Math.random() * 3
      }

      const mesh = children[idx]
      if (!mesh) return

      const fadeHead = Math.min(1, m.life)
      const fadeTail = Math.max(0.3, 1 - m.life * 0.25)
      mesh.material.opacity = fadeHead * fadeTail

      mesh.position.set(m.x, m.y, m.z)
      mesh.rotation.z = m.angle
      mesh.scale.set(m.scale * m.stretch, m.scale, 1)
    })
  })

  return (
    <group ref={groupRef} renderOrder={-5}>
      {Array.from({ length: METEOR_COUNT }).map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[1, 0.35]} />
          <meshBasicMaterial
            map={texture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}