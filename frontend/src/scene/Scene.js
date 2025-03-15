"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import RotatingPlanet from "@/components/RotatingPlanet";

export default function Scene() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = (event) => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("wheel", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full">
            <Canvas className="w-full h-full">
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 5, 2]} intensity={1} />
                <RotatingPlanet scrollY={scrollY} />
            </Canvas>
        </div>
    );
}