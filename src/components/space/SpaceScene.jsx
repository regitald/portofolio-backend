import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useScroll } from '../../context/ScrollContext'
import { Fog } from './Fog'
import { StarBackground } from './StarBackground'
import { Moon } from './Moon'
import { ScrollCamera } from './ScrollCamera'
// import { TechAmbientCode } from './TechAmbientCode'
import { SceneErrorBoundary } from './SceneErrorBoundary'
import { TechScene } from '../tech/TechScene'
import { StarOrbit } from '../space/StarOrbit'

export function SpaceScene() {
  const { section } = useScroll()

  return (
    <div className="fixed inset-0 z-0">

      {/* ⭐ HTML LAYER (INTERACTIVE) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        {section === "tech" && <StarOrbit />}
      </div>

      {/* 🎥 WEBGL LAYER (NO POINTER EVENTS) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none', // 🔥 INI PENTING
        }}
      >
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          camera={{ position: [0, 0, 25], fov: 60, near: 0.1, far: 500 }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#030308']} />
          <fog attach="fog" args={['#030308', 40, 180]} />

          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />

          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <StarBackground />
              <Moon />
              {/* <TechAmbientCode /> */}
              <Fog />
              <ScrollCamera />
              <TechScene />
            </Suspense>
          </SceneErrorBoundary>
        </Canvas>
      </div>

    </div>
  )
}