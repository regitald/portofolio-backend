import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useScroll } from '../../context/ScrollContext'

const MOON_IMG = '/assets/beautiful-glowing-gray-full-moon.png'

const HERO_SCALE_BASE = 100
const HERO_Y_BASE = -48
const HERO_Z = -25

// Terbit (rise): mulai sedikit di bawah horizon → naik halus → sama seperti hero di contact
const TERBIT_Y_START = HERO_Y_BASE - 6  // sedikit lebih rendah dari hero
const TERBIT_Y_END = HERO_Y_BASE
const TERBIT_SCALE_START = HERO_SCALE_BASE * 0.35 // mulai lebih kecil
const TERBIT_SCALE_END = HERO_SCALE_BASE
const TERBIT_Z = HERO_Z

const clamp01 = (v) => Math.max(0, Math.min(1, v))
const norm = (p, start, end) => clamp01((p - start) / (end - start || 1))
const lerp = (a, b, t) => a + (b - a) * t
const easeOutCubic = (t) => 1 - (1 - t) ** 3

export function Moon() {
  const groupRef = useRef(null)
  const innerGlowRef = useRef(null)
  const outerGlowRef = useRef(null)

  const texture = useTexture(MOON_IMG)
  const { scrollProgress, getProgressFor, mouse } = useScroll()

  texture.colorSpace = THREE.SRGBColorSpace

  useFrame((state) => {
    if (!groupRef.current) return

    const hero = getProgressFor('hero')
    const about = getProgressFor('about')
    const tech = getProgressFor('tech')
    const contact = getProgressFor('contact')

    const p = scrollProgress
    const time = state.clock.elapsedTime

    const heroT = norm(p, hero.start, hero.end)
    const aboutT = norm(p, about.start, about.end)
    const techT = norm(p, tech.start, tech.end)

    let posX = 0
    let posY = HERO_Y_BASE
    let posZ = HERO_Z
    let scale = HERO_SCALE_BASE
    let visible = true

    // ================= HERO → ABOUT (tenggelem awal, center) =================
    if (p <= about.end) {
      const lift = heroT * 0.2 + aboutT * 0.35

      posX = 0
      posY = HERO_Y_BASE + lift + Math.sin(time * 0.25) * 0.25
      posZ = HERO_Z

      const breath = 1 + 0.01 * Math.sin(time * 0.28)
      scale = HERO_SCALE_BASE * breath
    }

    // ================= TECH (tenggelem — fade out) =================
    else if (p <= tech.end) {
      const fade = 1 - techT
      scale = HERO_SCALE_BASE * Math.max(fade, 0)
      visible = fade > 0.05
    }

    // ================= TECH → CHAT → CONTACT (terbit — naik pelan, akhir = hero) =================
    else {
      const terbitT = norm(p, tech.end, contact.end)
      const riseT = clamp01((terbitT - 0.15) / 0.85) // tahan sedikit di bawah, baru naik
      const easeY = easeOutCubic(riseT)
      const easeScale = easeOutCubic(terbitT)

      posX = 0
      posY = lerp(TERBIT_Y_START, TERBIT_Y_END, easeY) + Math.sin(time * 0.25) * 0.25
      posZ = TERBIT_Z

      const baseScale = lerp(TERBIT_SCALE_START, TERBIT_SCALE_END, easeScale)
      const breath = 1 + 0.01 * Math.sin(time * 0.28)
      scale = baseScale * breath
      visible = true
    }

    groupRef.current.visible = visible
    if (!visible) return

    groupRef.current.position.set(posX, posY, posZ)
    groupRef.current.scale.setScalar(scale)

    // ===== billboard + spin =====
    const billboardQ = new THREE.Quaternion().copy(
      state.camera.quaternion
    )

    const spinQ = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      time * 0.02
    )

    billboardQ.multiply(spinQ)
    groupRef.current.quaternion.copy(billboardQ)

    // ===== mouse glow =====
    const dx = mouse.x
    const dy = mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const proximity = Math.max(0, Math.min(1, 1 - dist))

    if (innerGlowRef.current) {
      innerGlowRef.current.opacity =
        0.18 + proximity * 0.45 + Math.sin(time * 2) * 0.025
    }

    if (outerGlowRef.current) {
      outerGlowRef.current.opacity = 0.2 + proximity * 0.55
      outerGlowRef.current.color.setRGB(
        0.6 + proximity * 0.35,
        0.5 + proximity * 0.2,
        0.9 + proximity * 0.35
      )
    }
  })

  return (
    <group ref={groupRef}>
      {/* INNER GLOW */}
      <mesh scale={1.2} renderOrder={0}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={innerGlowRef}
          map={texture}
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* OUTER HALO */}
      <mesh scale={1.08} renderOrder={1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={outerGlowRef}
          map={texture}
          transparent
          opacity={0.28}
          color={new THREE.Color(0.6, 0.5, 0.9)}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* MAIN MOON */}
      <mesh scale={1} renderOrder={2}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.01}
          depthWrite={false} 
          depthTest={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}