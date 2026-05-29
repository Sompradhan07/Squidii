'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Y-height helpers ────────────────────────────────────────────────────────
   Paraboloid dome surface — all ingredients call foodY(x, z) to seat on it.
   Bowl rim is at ~y=0.92 in local space; food peaks at YOGURT_Y + DOME_HEIGHT.   */

const YOGURT_Y   = -0.34
const DOME_HEIGHT = 0.54

function foodY(x: number, z: number): number {
  const r2 = x * x + z * z
  return YOGURT_Y + DOME_HEIGHT * Math.max(0, 1 - r2 / (2.3 * 2.3))
}

/* ─── Bowl shell — premium ceramic profile ────────────────────────────────── */
function BowlShell() {
  /* Wider rim, gentle flare — characteristic of artisan ceramic bowls */
  const outerPts = useMemo<THREE.Vector2[]>(() => {
    const pts: THREE.Vector2[] = []
    for (let i = 0; i <= 34; i++) {
      const t = i / 34
      const a = t * Math.PI * 0.46
      pts.push(new THREE.Vector2(Math.sin(a) * 2.64, -Math.cos(a) * 0.96 + 0.10))
    }
    /* Elegant rim flare with slight lip — premium ceramic signature */
    pts.push(new THREE.Vector2(2.64, 0.56))
    pts.push(new THREE.Vector2(2.72, 0.74))
    pts.push(new THREE.Vector2(2.58, 0.88))
    pts.push(new THREE.Vector2(2.36, 0.94))
    return pts
  }, [])

  const innerPts = useMemo<THREE.Vector2[]>(() => {
    const pts: THREE.Vector2[] = []
    for (let i = 0; i <= 30; i++) {
      const t = i / 30
      const a = t * Math.PI * 0.46
      pts.push(new THREE.Vector2(Math.sin(a) * 2.42, -Math.cos(a) * 0.87 + 0.20))
    }
    pts.push(new THREE.Vector2(2.48, 0.68))
    return pts
  }, [])

  return (
    <group>
      {/* Exterior — warm matte ceramic, slight glaze, premium sheen */}
      <mesh
        geometry={useMemo(() => new THREE.LatheGeometry(outerPts, 128), [outerPts])}
        castShadow receiveShadow
      >
        <meshPhysicalMaterial
          color="#ede3cc"
          roughness={0.40}
          metalness={0}
          clearcoat={0.58}
          clearcoatRoughness={0.30}
          envMapIntensity={0.90}
          sheen={0.82}
          sheenRoughness={0.50}
          sheenColor={new THREE.Color('#dac8a8')}
        />
      </mesh>
      {/* Interior — creamy white, softer glaze */}
      <mesh
        geometry={useMemo(() => new THREE.LatheGeometry(innerPts, 128), [innerPts])}
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#f6efe2"
          roughness={0.28}
          metalness={0}
          clearcoat={0.52}
          clearcoatRoughness={0.22}
          side={THREE.BackSide}
          envMapIntensity={0.65}
        />
      </mesh>
    </group>
  )
}

/* ─── Yogurt base — fresh, creamy, slightly glossy ────────────────────────── */
function YogurtBase() {
  return (
    <group>
      {/* Deep fill — no gaps visible from any angle */}
      <mesh position={[0, YOGURT_Y - 0.20, 0]} receiveShadow>
        <cylinderGeometry args={[2.18, 2.04, 0.52, 72]} />
        <meshPhysicalMaterial color="#f6f0e2" roughness={0.20} metalness={0} />
      </mesh>
      {/* Surface — maximum clearcoat for that fresh/creamy wet look */}
      <mesh position={[0, YOGURT_Y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.18, 80]} />
        <meshPhysicalMaterial
          color="#fdf6eb"
          roughness={0.06}
          metalness={0}
          clearcoat={0.95}
          clearcoatRoughness={0.05}
          envMapIntensity={0.58}
        />
      </mesh>
    </group>
  )
}

/* ─── Banana slices — bright ripe yellow, layered in an arc ──────────────── */
function BananaSlices() {
  const slices = useMemo(() => {
    const coords: { x: number; z: number; ry: number }[] = [
      { x: -1.30, z:  0.48, ry:  0.40 },
      { x: -0.98, z:  0.80, ry:  0.22 },
      { x: -0.55, z:  1.05, ry:  0.08 },
      { x: -0.15, z:  1.18, ry:  0.00 },
      { x:  0.22, z:  1.14, ry: -0.14 },
      { x:  0.60, z:  0.98, ry: -0.30 },
      { x:  0.92, z:  0.72, ry: -0.46 },
      { x: -0.80, z:  0.40, ry:  0.28 },
      { x: -0.32, z:  0.60, ry:  0.10 },
      { x:  0.28, z:  0.52, ry: -0.22 },
      { x:  0.65, z:  0.30, ry: -0.38 },
    ]
    return coords.map(({ x, z, ry }) => ({
      pos: [x, foodY(x, z) + 0.05, z] as [number, number, number],
      ry,
      rx: -z * 0.12,
      rz: x * 0.08,
    }))
  }, [])

  const sliceGeom = useMemo(() => new THREE.CylinderGeometry(0.32, 0.30, 0.088, 32), [])

  return (
    <group>
      {slices.map((s, i) => (
        <group key={i} position={s.pos} rotation={[s.rx, s.ry, s.rz]}>
          <mesh geometry={sliceGeom} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#f0d648"
              roughness={0.50}
              metalness={0}
              clearcoat={0.28}
              clearcoatRoughness={0.50}
              envMapIntensity={0.32}
            />
          </mesh>
          {/* Core circle */}
          <mesh position={[0, 0.048, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.003, 20]} />
            <meshStandardMaterial color="#c8a030" roughness={0.88} />
          </mesh>
          {/* Outer ring */}
          <mesh position={[0, 0.047, 0]}>
            <torusGeometry args={[0.26, 0.020, 8, 30]} />
            <meshStandardMaterial color="#e6c638" roughness={0.75} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ─── Strawberries — deep red, very glossy like fresh-picked ─────────────── */
function Strawberries() {
  const pieces = useMemo(() => {
    const coords: { x: number; z: number; s: number }[] = [
      { x:  1.24, z:  0.44, s: 0.48 },
      { x:  1.28, z: -0.12, s: 0.44 },
      { x:  0.98, z: -0.64, s: 0.46 },
      { x:  0.54, z:  0.84, s: 0.40 },
      { x: -0.64, z:  0.84, s: 0.42 },
      { x:  0.08, z: -0.36, s: 0.38 },
      { x: -1.10, z: -0.22, s: 0.40 },
      { x:  0.68, z:  0.20, s: 0.36 },
      { x: -0.30, z: -0.70, s: 0.38 },
    ]
    return coords.map(({ x, z, s }) => ({
      pos: [x, foodY(x, z) + s * 0.52, z] as [number, number, number],
      scale: s,
      ry: Math.random() * Math.PI * 2,
      tilt: 0.26 + Math.random() * 0.22,
    }))
  }, [])

  const bodyGeom = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 22, 18)
    const pos = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      if (y < 0) {
        const k = 1 + y * 0.44
        pos.setX(i, pos.getX(i) * k)
        pos.setZ(i, pos.getZ(i) * k)
      }
    }
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <group>
      {pieces.map((p, i) => (
        <group key={i} position={p.pos} rotation={[p.tilt, p.ry, 0]} scale={p.scale}>
          {/* Berry body — deep red, high clearcoat = fresh wet berry */}
          <mesh geometry={bodyGeom} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#bf1826"
              roughness={0.14}
              metalness={0}
              clearcoat={0.94}
              clearcoatRoughness={0.10}
              envMapIntensity={0.65}
            />
          </mesh>
          {/* Cut face — warm pink interior */}
          <mesh position={[0, 0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.65, 24]} />
            <meshStandardMaterial color="#f09494" roughness={0.58} side={THREE.DoubleSide} />
          </mesh>
          {/* Seeds */}
          {Array.from({ length: 14 }).map((_, j) => {
            const a = (j / 14) * Math.PI * 2
            const row = j % 3
            const yy = 0.52 - row * 0.32
            const rr = Math.sqrt(Math.max(0, 1 - yy * yy)) * 0.88
            return (
              <mesh key={j} position={[Math.cos(a) * rr, yy, Math.sin(a) * rr]} scale={0.054}>
                <sphereGeometry args={[1, 5, 4]} />
                <meshStandardMaterial color="#f0df58" roughness={0.85} />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
}

/* ─── Blueberries — deep indigo-blue, glossy clusters ─────────────────────── */
function Blueberries() {
  const berries = useMemo(() => {
    const result: { pos: [number, number, number]; s: number; c: string }[] = []
    const palette = ['#1a0c3e', '#20123a', '#1c0e44', '#281658', '#160a38', '#241460']
    const clusters: [number, number][] = [
      [-0.90, -0.80], [-0.34, -1.02], [ 0.28, -0.90],
      [ 0.84, -0.64], [-0.58, -0.52], [ 0.06, -0.66],
      [-1.10, -0.44], [ 0.60, -0.36], [-0.24, -0.30],
    ]
    for (let ci = 0; ci < clusters.length; ci++) {
      const [cx, cz] = clusters[ci]
      const n = 6 + Math.floor(Math.random() * 3)
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + ci * 0.6
        const r = 0.04 + Math.random() * 0.28
        const x = cx + Math.cos(a) * r
        const z = cz + Math.sin(a) * r
        const s = 0.18 + Math.random() * 0.055
        result.push({
          pos: [x, foodY(x, z) + s * 0.90, z],
          s,
          c: palette[Math.floor(Math.random() * palette.length)],
        })
      }
    }
    return result
  }, [])

  const geom = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 16, 14)
    g.scale(1, 0.87, 1)
    return g
  }, [])

  return (
    <group>
      {berries.map((b, i) => (
        <group key={i} position={b.pos} scale={b.s}>
          <mesh geometry={geom} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={b.c}
              roughness={0.28}
              metalness={0}
              clearcoat={0.75}
              clearcoatRoughness={0.32}
              envMapIntensity={0.68}
              sheen={0.28}
              sheenRoughness={0.50}
              sheenColor={new THREE.Color('#4020a0')}
            />
          </mesh>
          {/* Calyx dimple */}
          <mesh position={[0, 0.86, 0]} scale={0.18}>
            <sphereGeometry args={[1, 6, 4]} />
            <meshStandardMaterial color="#0e0828" roughness={0.78} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ─── Granola — warm golden-caramel clusters, rough/toasted ──────────────── */
function Granola() {
  const pieces = useMemo(() => {
    const result: {
      pos: [number, number, number]
      scale: [number, number, number]
      rot: [number, number, number]
      c: string
    }[] = []
    const colors = [
      '#b87830', '#cc9240', '#a06828', '#d4a850',
      '#986020', '#c08838', '#b88030', '#dab060',
      '#a07020', '#c49040', '#ba8235', '#d09648',
    ]
    for (let i = 0; i < 155; i++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * 2.10
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      const sx = 0.09 + Math.random() * 0.11
      result.push({
        pos: [x, foodY(x, z) + sx * 0.55, z],
        scale: [sx, 0.036 + Math.random() * 0.044, 0.09 + Math.random() * 0.10],
        rot: [(Math.random() - 0.5) * 0.85, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.85],
        c: colors[i % colors.length],
      })
    }
    return result
  }, [])

  const geom = useMemo(() => new THREE.DodecahedronGeometry(1, 0), [])

  return (
    <group>
      {pieces.map((p, i) => (
        <mesh
          key={i}
          position={p.pos}
          scale={p.scale}
          rotation={p.rot}
          geometry={geom}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={p.c} roughness={0.90} metalness={0} flatShading />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Sliced almonds — pale, thin, scattered ──────────────────────────────── */
function Almonds() {
  const pieces = useMemo(() => {
    const result: { pos: [number, number, number]; ry: number; rx: number }[] = []
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2 + Math.random() * 0.3
      const r = 0.3 + Math.random() * 1.72
      const x = Math.cos(a + 0.3) * r
      const z = Math.sin(a + 0.3) * r
      result.push({
        pos: [x, foodY(x, z) + 0.07, z],
        ry: Math.random() * Math.PI,
        rx: (Math.random() - 0.5) * 0.60,
      })
    }
    return result
  }, [])

  const geom = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 8, 5)
    g.scale(1, 0.30, 0.50)
    return g
  }, [])

  return (
    <group>
      {pieces.map((a, i) => (
        <mesh
          key={i}
          position={a.pos}
          rotation={[a.rx, a.ry, 0]}
          scale={0.14}
          geometry={geom}
          castShadow
        >
          <meshStandardMaterial color="#e8d2aa" roughness={0.58} metalness={0} envMapIntensity={0.28} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Chia seeds — tiny dark dots dusted over surface ─────────────────────── */
function ChiaSeeds() {
  const arr = useMemo(() => {
    const N = 290
    const buf = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const ang = Math.random() * Math.PI * 2
      const r   = Math.sqrt(Math.random()) * 2.06
      const x   = Math.cos(ang) * r
      const z   = Math.sin(ang) * r
      buf[i * 3]     = x
      buf[i * 3 + 1] = foodY(x, z) + 0.054
      buf[i * 3 + 2] = z
    }
    return buf
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[arr, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#18100a" size={0.033} sizeAttenuation transparent opacity={0.80} />
    </points>
  )
}

/* ─── Coconut flakes — thin white curls scattered across surface ──────────── */
function CoconutFlakes() {
  const flakes = useMemo(() => {
    const result: { pos: [number, number, number]; rx: number; ry: number }[] = []
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + 0.4
      const r = 0.28 + Math.random() * 1.60
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      result.push({
        pos: [x, foodY(x, z) + 0.10, z],
        rx: (Math.random() - 0.5) * 0.50,
        ry: Math.random() * Math.PI,
      })
    }
    return result
  }, [])

  const geom = useMemo(() => new THREE.PlaneGeometry(0.30, 0.14), [])

  return (
    <group>
      {flakes.map((f, i) => (
        <mesh key={i} position={f.pos} rotation={[f.rx, f.ry, 0]} geometry={geom}>
          <meshStandardMaterial color="#faf7ec" roughness={0.90} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Mint leaves — fresh deep green, glossy ─────────────────────────────── */
function MintLeaves() {
  const leafGeom = useMemo(() => new THREE.SphereGeometry(1, 10, 6), [])
  const leaves = useMemo(() => {
    const spots = [
      { x: -0.25, z:  0.30, ry:  0.60, rx: 0.26, scale: [0.45, 0.058, 0.34] as [number,number,number] },
      { x:  0.18, z:  0.58, ry: -0.30, rx: 0.20, scale: [0.38, 0.052, 0.28] as [number,number,number] },
      { x: -0.08, z: -0.16, ry:  1.10, rx: 0.16, scale: [0.36, 0.046, 0.26] as [number,number,number] },
    ]
    return spots.map(s => ({
      pos: [s.x, foodY(s.x, s.z) + 0.27, s.z] as [number, number, number],
      ry: s.ry, rx: s.rx, scale: s.scale,
    }))
  }, [])

  return (
    <group>
      {leaves.map((l, i) => (
        <group key={i} position={l.pos} rotation={[l.rx, l.ry, 0.04]}>
          <mesh geometry={leafGeom} scale={l.scale} castShadow>
            <meshStandardMaterial color="#2a7630" roughness={0.58} side={THREE.DoubleSide} />
          </mesh>
          <mesh
            geometry={leafGeom}
            scale={[l.scale[0] * 0.94, l.scale[1] * 0.80, l.scale[2] * 0.94]}
            position={[0, -0.007, 0]}
          >
            <meshStandardMaterial color="#46a24a" roughness={0.70} side={THREE.BackSide} transparent opacity={0.70} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ─── Honey drizzle — rich amber, ultra-glossy, translucent ──────────────── */
function HoneyDrizzle() {
  const curve = useMemo(() => {
    const pts: [number, number][] = [
      [-0.65, 0.42], [-0.24, 0.06], [0.08, -0.24],
      [0.42, 0.20],  [0.72, -0.08], [0.28, 0.58],
    ]
    return new THREE.CatmullRomCurve3(
      pts.map(([x, z]) => new THREE.Vector3(x, foodY(x, z) + 0.14, z))
    )
  }, [])

  const tubeGeom = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.025, 8, false), [curve])

  return (
    <mesh geometry={tubeGeom}>
      <meshPhysicalMaterial
        color="#c88000"
        roughness={0.02}
        metalness={0}
        clearcoat={1.0}
        clearcoatRoughness={0.01}
        transparent
        opacity={0.90}
        envMapIntensity={0.95}
      />
    </mesh>
  )
}

/* ─── FloatingGroup — gentle bowl bob, independent of camera ──────────────── */
function FloatingGroup({ children, tiltX, tiltY }: {
  children: React.ReactNode
  tiltX: number
  tiltY: number
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.position.y  = Math.sin(t * 0.48) * 0.038
    ref.current.rotation.z  = Math.sin(t * 0.32) * 0.005  /* barely perceptible */
  })

  return (
    <group ref={ref} rotation={[tiltX, tiltY, 0]}>
      {children}
    </group>
  )
}

/* ─── Camera — smooth mouse parallax ─────────────────────────────────────── */
function Camera({ mx, my, baseY, baseZ }: {
  mx: number; my: number; baseY: number; baseZ: number
}) {
  const { camera } = useThree()
  const t = useRef({ x: 0, y: 0 })

  useFrame(() => {
    t.current.x += (mx * 0.38 - t.current.x) * 0.022
    t.current.y += (my * 0.18 - t.current.y) * 0.022
    camera.position.x = t.current.x
    camera.position.y = baseY + t.current.y
    camera.position.z = baseZ
    camera.lookAt(0, -0.05, 0)
  })
  return null
}

/* ─── Scene ───────────────────────────────────────────────────────────────── */
export default function BowlScene({
  mouseX  = 0,
  mouseY  = 0,
  camY    = 2.0,
  camZ    = 7.0,
}: {
  scattered?: boolean
  mouseX?: number
  mouseY?: number
  camY?: number
  camZ?: number
}) {
  return (
    <>
      <Camera mx={mouseX} my={mouseY} baseY={camY} baseZ={camZ} />

      {/* ═══ PREMIUM FOOD PHOTOGRAPHY LIGHTING RIG ═══
          Mimics a professional studio setup:
          · One large soft-box key light (dominant)
          · Warm fill from opposite side (1/3 of key)
          · Rim light from behind (separates bowl from bg)
          · Warm table bounce from below-front
          · Reduced ambient so lights do real work       */}

      {/* Warm ambient — restrained, lets directionals lead */}
      <ambientLight intensity={0.50} color="#fff3e8" />

      {/* KEY — large soft box, upper-left, main illumination + shadows */}
      <directionalLight
        position={[-5, 12, 5]}
        intensity={2.75}
        color="#fff8f0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={22}
        shadow-camera-near={0.5}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0004}
        shadow-radius={4}
      />

      {/* FILL — right side, 1/3 of key, warm white */}
      <directionalLight position={[ 8,  5,  3]} intensity={0.82} color="#ffe8cc" />

      {/* RIM — behind, creates bowl-from-background edge separation */}
      <directionalLight position={[ 1,  9, -10]} intensity={0.52} color="#fffcf5" />

      {/* TABLE BOUNCE — warm, simulates tablecloth/surface reflection */}
      <directionalLight position={[ 0, -4,  6]} intensity={0.30} color="#fff0d8" />

      {/* Side accent — adds subtle depth to the scene */}
      <directionalLight position={[-6,  2, -2]} intensity={0.15} color="#ffe4c0" />

      {/* INNER GLOW — point light inside bowl, makes yogurt and food luminous */}
      <pointLight position={[0, -0.08, 0]} intensity={0.85} color="#fff8e8" distance={3.5} decay={2} />

      {/* Dawn environment — warm morning light, ideal for food photography */}
      <Environment preset="dawn" environmentIntensity={0.72} />

      <ContactShadows
        position={[0, -1.32, 0]}
        opacity={0.36}
        scale={10}
        blur={3.2}
        far={4.5}
        color="#4a3520"
      />

      {/*
        Bowl tilted ~41° toward camera — optimal food-photography overhead angle.
        FloatingGroup adds a gentle 0.038-unit bob (barely perceptible, premium feel).
      */}
      <FloatingGroup tiltX={0.72} tiltY={-0.14}>
        <BowlShell />
        <YogurtBase />
        <Granola />
        <ChiaSeeds />
        <Almonds />
        <CoconutFlakes />
        <BananaSlices />
        <Blueberries />
        <Strawberries />
        <MintLeaves />
        <HoneyDrizzle />
      </FloatingGroup>
    </>
  )
}
