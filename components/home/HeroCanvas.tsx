"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. Constellation Star & Telemetry Network Particles
function ConstellationField() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const count = 1200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.03 + mouse.x * 0.05;
    ref.current.rotation.x = t * 0.015 + mouse.y * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#34d399"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

// 2. Futuristic 3D Route Corridor (Highway Velocity Grid)
function RouteCorridor() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    // Generate curved highway lanes
    for (let x = -8; x <= 8; x += 1.6) {
      for (let z = -12; z <= 4; z += 1) {
        points.push(new THREE.Vector3(x, -2.2, z));
        points.push(new THREE.Vector3(x, -2.2, z + 0.6));
      }
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    const t = state.clock.getElapsedTime();
    linesRef.current.position.z = (t * 2) % 1;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#06b6d4" transparent opacity={0.25} />
    </lineSegments>
  );
}

// 3. 3D Executive Vehicle Wireframe Chassis & Telemetry Beacons
function ExecutiveChassis() {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Smooth cinematic hover & gentle rotation reacting to cursor
    group.current.position.y = Math.sin(t * 0.8) * 0.12 - 0.2;
    group.current.rotation.y = 0.35 + Math.sin(t * 0.4) * 0.12 + mouse.x * 0.25;
    group.current.rotation.x = -0.15 + mouse.y * 0.15;
  });

  return (
    <group ref={group} position={[3.2, 0.2, -1.8]} scale={1.15}>
      {/* Aerodynamic Luxury Coach Wireframe Hull */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3.6, 1.3, 1.2]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Sleek Cabin Roofline */}
      <mesh position={[-0.1, 1.1, 0]}>
        <boxGeometry args={[3.2, 0.2, 1.0]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.45} />
      </mesh>

      {/* Aerodynamic Front Slope */}
      <mesh position={[1.7, 0.3, 0]} rotation={[0, 0, -0.45]}>
        <planeGeometry args={[1.2, 1.1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Dual Projector Headlight Cones */}
      <mesh position={[2.0, 0.1, 0.4]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.3, 1.8, 16, 1, true]} />
        <meshBasicMaterial color="#fef08a" transparent opacity={0.28} />
      </mesh>
      <mesh position={[2.0, 0.1, -0.4]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.3, 1.8, 16, 1, true]} />
        <meshBasicMaterial color="#fef08a" transparent opacity={0.28} />
      </mesh>

      {/* 4 GPS Telemetry Wheels */}
      {[-1.1, 1.1].map((x) =>
        [-0.6, 0.6].map((z) => (
          <group key={`${x}-${z}`} position={[x, -0.3, z]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.32, 0.06, 8, 24]} />
              <meshBasicMaterial color="#f59e0b" transparent opacity={0.7} />
            </mesh>
          </group>
        ))
      )}

      {/* Telemetry Radar Rings */}
      <group position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[2.0, 2.04, 48]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.6, 2.63, 48]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// 4. Glowing GPS Telemetry Nodes (Hyderabad, Secunderabad, Warangal, Vijayawada)
function TelemetryNodes() {
  const nodes = [
    { pos: [-3.0, 1.2, -3], label: "Secunderabad HQ", color: "#10b981" },
    { pos: [-1.8, -0.8, -2], label: "Hyderabad Fleet Hub", color: "#06b6d4" },
    { pos: [-4.2, -1.0, -4], label: "Airport Transit corridor", color: "#f59e0b" },
    { pos: [1.2, 2.0, -5], label: "Telangana Outstation Route", color: "#38bdf8" },
  ];

  return (
    <group>
      {nodes.map((node, i) => (
        <group key={i} position={node.pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.15, 0.18, 24]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <ConstellationField />
      <RouteCorridor />
      <ExecutiveChassis />
      <TelemetryNodes />
    </Canvas>
  );
}
