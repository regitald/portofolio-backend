import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '../../context/ScrollContext'

const LAT = 75
const LNG = 150
const RADIUS = 12.2

export function TechCoreSphere() {
  const pointsRef = useRef()
  const { scrollProgress, getProgressFor } = useScroll()

  // ===============================
  // PERFECT STRUCTURED SPHERE
  // ===============================
  const { positions, randoms } = useMemo(() => {
    const pos = []
    const rnd = []

    for (let i = 0; i <= LAT; i++) {
      const v = i / LAT
      const phi = v * Math.PI

      for (let j = 0; j <= LNG; j++) {
        const u = j / LNG
        const theta = u * Math.PI * 2

        const x = RADIUS * Math.sin(phi) * Math.cos(theta)
        const y = RADIUS * Math.cos(phi)
        const z = RADIUS * Math.sin(phi) * Math.sin(theta)

        pos.push(x, y, z)
        rnd.push(Math.random())
      }
    }

    return {
      positions: new Float32Array(pos),
      randoms: new Float32Array(rnd),
    }
  }, [])

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    return g
  }, [positions, randoms])

  const { start, end } = getProgressFor('tech')
  const span = end - start || 1

  useFrame((state) => {
    if (!pointsRef.current) return

    const local = THREE.MathUtils.clamp(
      (scrollProgress - start) / span,
      0,
      1
    )

    const mat = pointsRef.current.material

    if (local < 0.33) mat.uniforms.uStage.value = 0.0
    else if (local < 0.66) mat.uniforms.uStage.value = 1.0
    else mat.uniforms.uStage.value = 2.0

    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uProgress.value = local

    pointsRef.current.rotation.y += 0.0015
  })

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uStage: { value: 0 },
          uProgress: { value: 0 },
        },
        vertexShader: `
          attribute float aRandom;
          varying float vRnd;
          varying vec3 vPos;

          void main() {
            vRnd = aRandom;
            vPos = position;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 0.35 * (120.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying float vRnd;
          varying vec3 vPos;

          uniform float uTime;
          uniform float uStage;
          uniform float uProgress;

          float hash(vec3 p){
            return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453);
          }

          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;

            float noise = hash(floor(vPos * 3.0));

            // ===== base cool white/blue =====
            vec3 base = vec3(0.85, 0.9, 1.0);

            // ===== purple-blue UN vibe =====
            vec3 purple = vec3(0.55, 0.4, 1.0);
            vec3 hot = vec3(1.0, 0.35, 1.2);

            // ===== structured heat mask =====
            float heatMask = smoothstep(0.72, 0.95, noise);

            // ===== animated pulse =====
            float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + noise * 6.0);

            vec3 heatColor = mix(purple, hot, pulse);

            // ===== final color (progress driven) =====
            vec3 color = mix(base, heatColor, heatMask * uProgress);

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    []
  )

  return <points ref={pointsRef} geometry={geom} material={material} />
}