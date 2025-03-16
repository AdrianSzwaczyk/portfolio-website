"use client";

import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import RotatingPlanet from "@/components/RotatingPlanet";
import Navbar from "@/components/Navbar";
import CameraController from "@/components/CameraController";

export default function Scene() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            console.log("Scroll Y:", window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full">
            <Canvas className="w-full h-full">
                <CameraController />
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 5, 2]} intensity={1} />
                <Navbar />
                {/*  <RotatingPlanet scrollY={scrollY} />  */}
            </Canvas>
        </div>
    );
}