import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '../../context/ScrollContext'

const DAMP = 0.018

export function ScrollCamera() {
  const {
    scrollProgress,
    mouse,
    moonClickZoomOut,
    setMoonClickZoomOut,
    getProgressFor,
  } = useScroll()

  const zoomOutRef = useRef(false)
  const zoomOutStartRef = useRef(0)

  const hero = getProgressFor('hero')
  const about = getProgressFor('about')
  const roles = getProgressFor('roles')
  const experience = getProgressFor('experience')
  const projects = getProgressFor('projects')
  const tech = getProgressFor('tech')
  const chat = getProgressFor('chat')
  const contact = getProgressFor('contact')

  useEffect(() => {
    if (moonClickZoomOut) {
      zoomOutRef.current = true
      zoomOutStartRef.current = performance.now()
      const t = setTimeout(() => {
        setMoonClickZoomOut?.(false)
        zoomOutRef.current = false
      }, 1600)
      return () => clearTimeout(t)
    }
  }, [moonClickZoomOut, setMoonClickZoomOut])

  useFrame((state) => {
    const cam = state.camera
    const t = scrollProgress

    let targetX = 0
    let targetY = 0
    let targetZ = 25
    let lookTarget = { x: 0, y: 0, z: 0 }

    if (zoomOutRef.current) {
      const elapsed = (performance.now() - zoomOutStartRef.current) / 1000
      const ease = 1 - Math.pow(1 - Math.min(elapsed / 1.2, 1), 2)
      targetZ = 25 + ease * 12
      lookTarget = { x: 0, y: 0, z: -20 }
    }

    else if (t >= hero.start && t < hero.end) {
      targetZ = 25
      lookTarget = { x: 0, y: 0, z: 0 }
    }

    else if (t >= about.start && t < about.end) {
      const u = (t - about.start) / about.span
      targetZ = 25 - u * 8
      lookTarget = { x: 0, y: 0, z: -15 }
    }

    else if (t >= roles.start && t < roles.end) {
      targetZ = 17
      lookTarget = { x: 0, y: 0, z: -25 }
    }

    else if (t >= experience.start && t < experience.end) {
      targetZ = 14
      lookTarget = { x: 0, y: 0, z: -35 }
    }

    else if (t >= projects.start && t < projects.end) {
      targetZ = -10
      lookTarget = { x: 0, y: 0, z: 0 }
    }

    else if (t >= tech.start && t < tech.end) {
      targetZ = 18
      targetX = mouse.x * 0.6
      targetY = mouse.y * 0.3
      lookTarget = { x: 0, y: 0, z: 0 }
    }

    else if (t >= chat.start && t < chat.end) {
      targetZ = -40
      lookTarget = { x: 0, y: 0, z: -50 }
    }

    else if (t >= contact.start) {
      targetZ = 25
      lookTarget = { x: 0, y: 0, z: 0 }
    }

    cam.position.x += (targetX - cam.position.x) * DAMP
    cam.position.y += (targetY - cam.position.y) * DAMP
    cam.position.z += (targetZ - cam.position.z) * DAMP

    state.camera.lookAt(
      lookTarget.x,
      lookTarget.y,
      lookTarget.z
    )
  })

  return null
}