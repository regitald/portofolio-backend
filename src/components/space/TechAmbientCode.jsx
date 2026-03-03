import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '../../context/ScrollContext'

const COUNT = 100
const AREA_X = 100
const AREA_Y = 100
const Z_NEAR = -10
const Z_FAR = 25

const COLS = 10
const ROWS = Math.ceil(COUNT / COLS)
const CELL_X = (AREA_X * 2) / COLS
const CELL_Y = (AREA_Y * 2) / ROWS

const textureCache = new Map()

function createCodeTexture(text) {
  if (textureCache.has(text)) return textureCache.get(text)

  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // ⭐ TEXT BESAR & TAJAM
  ctx.font = 'bold 110px monospace'
  ctx.fillStyle = 'rgba(150,220,255,1)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = false


  textureCache.set(text, texture)
  return texture
}

export function TechAmbientCode() {
  const groupRef = useRef(null)
  const particlesRef = useRef(null)
  const { section } = useScroll()

  if (!particlesRef.current) {
    const snippets = [
      'Node.js','Strapi','PHP','Laravel','GraphQL','React',
      'ExpressJS','Bootstrap','JavaScript','TypeScript','HTML',
      'CSS','Vue.js','Golang','Microservices','Meilisearch','RestAPI'
    ]

    particlesRef.current = Array.from({ length: COUNT }).map((_, i) => {
      const col = i % COLS
      const row = Math.floor(i / COLS)

      const baseX = -AREA_X + col * CELL_X + CELL_X / 2
      const baseY = -AREA_Y + row * CELL_Y + CELL_Y / 2

      return {
        x: baseX + (Math.random() - 0.5) * 1.5,
        y: baseY + (Math.random() - 0.5) * 1.5,
        z: Z_NEAR + Math.random() * (Z_FAR - Z_NEAR),
        vy: 0.03 + Math.random() * 0.05,
        vx: (Math.random() - 0.5) * 0.015,
        rot: 0,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        baseOpacity: 0.5 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        snippet: snippets[i % snippets.length],
      }
    })
  }

  useFrame((state) => {
    if (!groupRef.current) return

    const shouldShow = section === 'chat' || section === 'contact'
    groupRef.current.visible = shouldShow
    if (!shouldShow) return

    const dt = state.clock.getDelta()
    const t = state.clock.elapsedTime
    const cam = state.camera

    groupRef.current.children.forEach((mesh, idx) => {
      const p = particlesRef.current[idx]

      p.y += p.vy * dt
      p.x += p.vx * dt

      if (p.y > AREA_Y) p.y = -AREA_Y
      if (p.x > AREA_X) p.x = -AREA_X
      if (p.x < -AREA_X) p.x = AREA_X

      p.rot += p.rotSpeed * dt

      const flicker = 0.75 + Math.sin(t * 1.4 + p.phase) * 0.25

      mesh.position.set(p.x, p.y, p.z)

      // ⭐ FIX: selalu hadap kamera (NO MIRROR)
      mesh.lookAt(cam.position)

      mesh.material.opacity = p.baseOpacity * flicker
    })
  })

  return (
    <group ref={groupRef}>
      {particlesRef.current?.map((p, i) => {
        const texture = createCodeTexture(p.snippet)

        return (
          <mesh key={i} position={[p.x, p.y, p.z]} renderOrder={30}>
            {/* ⭐ LEBIH BESAR */}
            <planeGeometry args={[6.2, 1.6]} />
            <meshBasicMaterial
              map={texture}
              transparent
              opacity={p.baseOpacity}
              depthWrite={false}
              depthTest={false}
              toneMapped={false}
              side={THREE.FrontSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}