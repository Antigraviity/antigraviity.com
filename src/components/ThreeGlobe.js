import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const Globe = () => {
  const globeRef = useRef();

  // Rotate the globe
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.003;
    }
  });

  return (
    <>
      <group ref={globeRef}>
        {/* Main sphere */}
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshPhongMaterial
            color="#0a0a1e"
            emissive="#050510"
            specular="#3a3a5a"
            shininess={20}
            wireframe={false}
            transparent={true}
            opacity={0.4}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh>
          <sphereGeometry args={[2.01, 32, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe={true}
            transparent={true}
            opacity={0.15}
          />
        </mesh>

        {/* Glowing dots for continents */}
        {[
          { lat: 40, lon: -100 },  // North America
          { lat: 50, lon: 10 },    // Europe
          { lat: 0, lon: 20 },     // Africa
          { lat: 30, lon: 100 },   // Asia
          { lat: -25, lon: 135 },  // Australia
        ].map((pos, i) => {
          const phi = (90 - pos.lat) * (Math.PI / 180);
          const theta = (pos.lon + 180) * (Math.PI / 180);
          const x = -2.05 * Math.sin(phi) * Math.cos(theta);
          const y = 2.05 * Math.cos(phi);
          const z = 2.05 * Math.sin(phi) * Math.sin(theta);

          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#60a5fa" />
            </mesh>
          );
        })}
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />
    </>
  );
};

const ThreeGlobe = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Globe />
      </Canvas>
    </div>
  );
};

export default ThreeGlobe;
