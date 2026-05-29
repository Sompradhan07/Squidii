'use client'

import { Suspense, useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import BowlScene from './BowlScene'

interface BowlCanvasProps {
  scattered?: boolean
  className?: string
  intensity?: 'hero' | 'section' | 'minimal'
}

export default function BowlCanvas({
  scattered = false,
  className = '',
  intensity = 'hero',
}: BowlCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse]     = useState({ x: 0, y: 0 })
  const frameRef              = useRef<number>(0)
  const pendingMouse          = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    pendingMouse.current = {
      x:  ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
      y: -((e.clientY - rect.top)  / rect.height - 0.5) * 2,
    }
    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(() => {
        setMouse({ ...pendingMouse.current })
        frameRef.current = 0
      })
    }
  }, [])

  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }, [])

  /* Higher DPR on desktop for sharper food visuals */
  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.75]

  /* More overhead angle — classic food-photography 45° look */
  const fov  = intensity === 'hero' ? 36 : intensity === 'section' ? 42 : 50
  const camY = intensity === 'hero' ? 2.0 : intensity === 'section' ? 1.55 : 1.1
  const camZ = intensity === 'hero' ? 7.0 : intensity === 'section' ? 8.2  : 10.0

  return (
    <div
      ref={containerRef}
      className={`bowl-canvas ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={dpr}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.30,
          stencil: false,
        }}
        style={{ background: 'transparent' }}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault fov={fov} position={[0, camY, camZ]} near={0.1} far={42} />
        <Suspense fallback={null}>
          <BowlScene
            scattered={scattered}
            mouseX={mouse.x}
            mouseY={mouse.y}
            camY={camY}
            camZ={camZ}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
