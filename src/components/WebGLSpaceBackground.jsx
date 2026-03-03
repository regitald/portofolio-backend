import { useRef, useEffect } from 'react'
import * as THREE from 'three'

// Adapted from Yohei Nishitsuji (Codrops / Shadertoy MX3BDH)
// https://tympanus.net/codrops/2025/02/18/rendering-the-simulation-theory-exploring-fractals-glsl-and-the-nature-of-reality/
const fragmentShader = `
  uniform vec2 iResolution;
  uniform float iTime;

  vec3 hsv(float h, float s, float v) {
    vec4 t = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
  }

  void main() {
    vec2 r = iResolution.xy;
    vec2 FC = gl_FragCoord.xy;
    float t = iTime;
    vec4 o = vec4(0.0, 0.0, 0.0, 1.0);
    float i = 0.0;
    float e = 0.0;
    float g = 0.0;
    float R = 0.0;
    float s = 0.0;
    vec3 d = vec3(FC.xy / r - 0.6, 1.0);
    vec3 q = d;
    vec3 p;
    q.y -= 1.0;
    q.z -= 1.0;

    for (int j = 0; j < 99; j++) {
      i += 1.0;
      e += i / 8e5;
      o.rgb += hsv(0.6, R + g * 0.3, e * i / 40.0);
      s = 4.0;
      q += d * e * R * 0.2;
      p = q;
      g += p.y / s;
      R = length(p);
      p = vec3(R - 0.5 + sin(t) * 0.02, exp2(mod(-p.z, s) / R) - 0.2, p.z);
      e = p.y - 1.0;
      p.y -= 1.0;
      float k = 1.0;
      for (int ii = 0; ii < 14; ii++) {
        e += 0.03 - abs(dot(sin(p.yzx * k), cos(p.xzz * k)) / k * 0.6);
        k += k;
      }
    }

    gl_FragColor = o;
  }
`

const vertexShader = `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

export function WebGLSpaceBackground() {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const materialRef = useRef(null)
  const frameRef = useRef(0)
  const startRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        iResolution: { value: new THREE.Vector2(width, height) },
        iTime: { value: 0 },
      },
      depthWrite: false,
      depthTest: false,
    })
    materialRef.current = material

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      if (materialRef.current) materialRef.current.uniforms.iResolution.value.set(w, h)
    }

    const animate = (time) => {
      frameRef.current = requestAnimationFrame(animate)
      if (startRef.current == null) startRef.current = time
      const t = (time - startRef.current) * 0.001
      if (materialRef.current) materialRef.current.uniforms.iTime.value = t
      renderer.render(scene, camera)
    }
    animate(performance.now())
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frameRef.current)
      if (container && renderer.domElement) container.removeChild(renderer.domElement)
      renderer.dispose()
      material.dispose()
      geometry.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#030305' }}
      aria-hidden
    />
  )
}
