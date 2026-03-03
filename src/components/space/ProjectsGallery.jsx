import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html, useTexture } from '@react-three/drei'
import { useScroll } from '../../context/ScrollContext'
import { projects } from '../../data/portfolio'

/** ================= CONFIG ================= */

const STRIP_Z = -42
const IMAGE_W = 10
const IMAGE_H = 6
const SPACING = 14
const LERP = 0.06

const FALLBACK =
  'https://placehold.co/1200x800/020617/475569?text=Project'

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src || '')

/** ================= SINGLE PROJECT ================= */

function ProjectSlide({ proj, index }) {
  const groupRef = useRef(null)
  const videoRef = useRef(null)

  const src =
    proj.preview && proj.preview !== '' ? proj.preview : FALLBACK

  const isVid = isVideo(src)

  // ===== IMAGE TEXTURE =====
  const imageTexture = useTexture(isVid ? FALLBACK : src)

  // ===== VIDEO TEXTURE =====
  const videoTexture = useMemo(() => {
    if (!isVid) return null

    const video = document.createElement('video')
    video.src = src
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.autoplay = true

    videoRef.current = video

    const tex = new THREE.VideoTexture(video)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.format = THREE.RGBAFormat
    tex.generateMipmaps = false

    return tex
  }, [src, isVid])

  // autoplay video safely
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const texture = isVid ? videoTexture : imageTexture

  useFrame((state) => {
    if (!groupRef.current) return

    const cam = state.camera
    groupRef.current.rotation.y = Math.atan2(
      cam.position.x - groupRef.current.position.x,
      cam.position.z - groupRef.current.position.z
    )
  })

  const x = index * SPACING

  return (
    <group ref={groupRef} position={[x, 0, 0]}>
      {/* ===== BIG MEDIA ===== */}
      <mesh>
        <planeGeometry args={[IMAGE_W, IMAGE_H]} />
        <meshBasicMaterial
          map={texture || imageTexture}
          toneMapped={false}
          transparent
        />
      </mesh>

      {/* ===== GRADIENT FADE ===== */}
      <mesh position={[0, -IMAGE_H / 2 + 0.8, 0.01]}>
        <planeGeometry args={[IMAGE_W, 2.2]} />
        <meshBasicMaterial transparent opacity={0.55} color="#000000" />
      </mesh>

      {/* ===== TEXT ===== */}
      <Html
        center
        position={[0, -IMAGE_H / 2 + 0.9, 0.02]}
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            width: 320,
            textAlign: 'center',
            fontFamily: 'var(--font-nav), system-ui',
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'white',
              marginBottom: 4,
            }}
          >
            {proj.title}
          </div>

          <div
            style={{
              fontSize: 12,
              color: '#cbd5e1',
              opacity: 0.85,
            }}
          >
            {proj.desc?.slice(0, 80)}
          </div>
        </div>
      </Html>
    </group>
  )
}

/** ================= MAIN GALLERY ================= */

export function ProjectsGallery() {
  const { scrollProgress, getProgressFor, section } = useScroll()
  const stripRef = useRef(null)
  const opacityRef = useRef(0)

  const { start, end } = getProgressFor('projects')
  const span = end - start || 1

  const slides = useMemo(() => projects, [])

  useFrame(() => {
    if (!stripRef.current) return

    // ⭐ smooth show/hide
    const targetOpacity = section === 'projects' ? 1 : 0
    opacityRef.current += (targetOpacity - opacityRef.current) * 0.08
    stripRef.current.visible = opacityRef.current > 0.02

    stripRef.current.children.forEach((child) => {
      child.traverse((obj) => {
        if (obj.material && 'opacity' in obj.material) {
          obj.material.transparent = true
          obj.material.opacity = opacityRef.current
        }
      })
    })

    // ⭐ cinematic horizontal scroll
    const local = THREE.MathUtils.clamp(
      (scrollProgress - start) / span,
      0,
      1
    )

    const maxOffset = (slides.length - 1) * SPACING
    const targetX = -local * maxOffset

    stripRef.current.position.x = THREE.MathUtils.lerp(
      stripRef.current.position.x,
      targetX,
      LERP
    )
  })

  return (
    <group ref={stripRef} position={[0, 0, STRIP_Z]}>
      {slides.map((proj, i) => (
        <ProjectSlide key={proj.id} proj={proj} index={i} />
      ))}
    </group>
  )
}