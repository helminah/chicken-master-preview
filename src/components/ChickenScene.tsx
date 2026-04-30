import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function Bucket() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={ref}>
      <mesh position={[0, -0.55, 0]} rotation={[0, 0, Math.PI]} castShadow receiveShadow>
        <coneGeometry args={[1.35, 1.6, 64, 1, true]} />
        <meshStandardMaterial color="#11100d" roughness={0.32} metalness={0.56} />
      </mesh>
      <mesh position={[0, 0.16, 0]} castShadow>
        <torusGeometry args={[1.18, 0.07, 18, 96]} />
        <meshStandardMaterial color="#f59e0b" emissive="#8a2c00" emissiveIntensity={0.35} />
      </mesh>
      {[-0.55, 0, 0.55].map((x, index) => (
        <Float key={x} speed={2 + index * 0.4} rotationIntensity={0.5} floatIntensity={0.32}>
          <mesh position={[x, 0.63 + index * 0.08, 0.05]} castShadow>
            <sphereGeometry args={[0.38, 48, 48]} />
            <MeshDistortMaterial
              color={index === 1 ? "#d97706" : "#b45309"}
              roughness={0.74}
              metalness={0.08}
              distort={0.38}
              speed={3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function ChickenScene() {
  return (
    <Canvas shadows camera={{ position: [0, 1.1, 4.2], fov: 42 }} className="h-full w-full">
      <color attach="background" args={["#080604"]} />
      <ambientLight intensity={0.65} />
      <spotLight position={[3, 4, 2]} angle={0.35} penumbra={0.7} intensity={5} color="#ffb347" castShadow />
      <pointLight position={[-2, 1.2, 2]} intensity={2} color="#ef4e22" />
      <Sparkles count={60} scale={[4, 2.2, 2]} size={3} speed={0.5} color="#f59e0b" />
      <Bucket />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
    </Canvas>
  );
}
