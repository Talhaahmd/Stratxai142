import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Reveal } from '../motion/Reveal';

// Import the specific GLB model found in assets
// Note: Vite will resolve this to the public URL
// @ts-ignore
import modelPath from '../../assets/Holographic Shapes_24.glb?url';

function Model({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
    const { scene } = useGLTF(modelPath);
    const meshRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        // Smoothly interpolate mouse values
        const targetRotationY = mouse.current.x * 0.5;
        const targetRotationX = mouse.current.y * 0.2;

        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, delta * 2);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, delta * 2);
    });

    return (
        <group ref={meshRef}>
            <primitive object={scene} scale={1.5} />
        </group>
    );
}

function Scene() {
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} color="#a855f7" />
            <directionalLight position={[-5, -5, -5]} intensity={1} color="#3b82f6" />

            <Center>
                <Float
                    speed={2}
                    rotationIntensity={0.5}
                    floatIntensity={0.5}
                    floatingRange={[-0.1, 0.1]}
                >
                    <EntranceAnim>
                        <Model mouse={mouse} />
                    </EntranceAnim>
                </Float>
            </Center>
        </>
    );
}

function EntranceAnim({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!group.current) return;
        const t = Math.min(1, state.clock.elapsedTime * 0.8);
        const ease = 1 - Math.pow(1 - t, 4);
        group.current.scale.setScalar(ease);
    });

    return <group ref={group}>{children}</group>;
}

const Hero3D = () => {
    return (
        <section className="relative w-full h-[100dvh] bg-neutral-950 overflow-hidden">
            {/* Background Effects with subtle movement/parallax could be added here */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950" />
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255, 255, 255, 0.05) 50px)'
                }}
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_0%,_#0a0a0a_100%)]" />

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10">
                <Canvas
                    dpr={[1, 1.5]} // Optimized dpr
                    gl={{ antialias: true, powerPreference: "high-performance" }}
                    camera={{ position: [0, 0, 8], fov: 45 }}
                >
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-12 left-6 md:left-12 z-20 max-w-xl pointer-events-none select-none">
                <Reveal variant="fadeUp" delay={0.2} duration={1}>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Brands and Websites that <span className="text-purple-400">move people</span> and drive growth.
                    </h1>
                </Reveal>
            </div>
        </section>
    );
};

export default Hero3D;
