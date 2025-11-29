import { useRef, useEffect } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

function Model({ url, wireframe }) {
  const gltf = useLoader(GLTFLoader, url);
  const meshRef = useRef();

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.wireframe = wireframe;
          // Ensure materials are properly set up
          if (!child.material.map) {
            child.material.color = new THREE.Color(0xcccccc);
          }
        }
      });
    }
  }, [wireframe, gltf]);

  return (
    <Center>
      <primitive object={gltf.scene} ref={meshRef} />
    </Center>
  );
}

function Scene({ modelUrl, wireframe, backgroundColor }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(backgroundColor);
  }, [backgroundColor, scene]);

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />

      {/* 3D Model */}
      {modelUrl && <Model url={modelUrl} wireframe={wireframe} />}

      {/* Camera Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={50}
        maxPolarAngle={Math.PI}
      />

      {/* Environment for better lighting */}
      <Environment preset="studio" />
    </>
  );
}

export default function Viewer3D({ modelUrl, wireframe, backgroundColor }) {
  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows>
        <Scene
          modelUrl={modelUrl}
          wireframe={wireframe}
          backgroundColor={backgroundColor}
        />
      </Canvas>
    </div>
  );
}
