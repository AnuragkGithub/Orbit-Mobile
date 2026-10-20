import React, { Suspense, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';

function Planet() {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18;
    if (sphere.current) {
      sphere.current.rotation.x += delta * 0.035;
      sphere.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.07;
    }
  });
  return <group ref={group}>
    <mesh ref={sphere}>
      <icosahedronGeometry args={[1.05, 5]} />
      <meshStandardMaterial color="#7564FF" roughness={0.26} metalness={0.38} emissive="#3522A6" emissiveIntensity={0.48} />
    </mesh>
    <mesh rotation={[1.12, 0.18, -0.35]}>
      <torusGeometry args={[1.48, 0.018, 12, 180]} />
      <meshStandardMaterial color="#8FE8FF" emissive="#48CFFF" emissiveIntensity={1.8} metalness={0.7} roughness={0.25} />
    </mesh>
    <mesh rotation={[1.12, 0.18, -0.35]}>
      <torusGeometry args={[1.58, 0.006, 8, 180]} />
      <meshBasicMaterial color="#A99CFF" transparent opacity={0.65} />
    </mesh>
    <mesh position={[-0.3, 0.36, 0.86]}>
      <sphereGeometry args={[0.12, 20, 20]} />
      <meshBasicMaterial color="#D9F8FF" />
    </mesh>
  </group>;
}

export default function OrbitPlanet() {
  return <View style={styles.wrap}>
    <View pointerEvents="none" style={styles.glow} />
    <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.9} />
      <pointLight position={[3, 3, 4]} intensity={28} color="#B9B2FF" />
      <pointLight position={[-3, -2, 2]} intensity={14} color="#31D7FF" />
      <Suspense fallback={null}><Planet /></Suspense>
    </Canvas>
    <View style={styles.caption} pointerEvents="none">
      <Text style={styles.captionLabel}>YOUR UNIVERSE</Text>
      <Text style={styles.captionValue}>Level 04  ·  Growing</Text>
    </View>
  </View>;
}
const styles = StyleSheet.create({
  wrap: { height: 286, width: '100%', alignItems: 'center', justifyContent: 'center' },
  glow: { position: 'absolute', width: 230, height: 230, borderRadius: 130, backgroundColor: '#4B3BC5', opacity: 0.2, shadowColor: '#7665FF', shadowOpacity: 1, shadowRadius: 60, elevation: 18 },
  caption: { position: 'absolute', bottom: 4, alignItems: 'center' },
  captionLabel: { color: '#8B91B2', fontSize: 9, letterSpacing: 3, fontWeight: '700' },
  captionValue: { color: '#E3E5FF', fontSize: 12, marginTop: 5, letterSpacing: 0.4 }
});
