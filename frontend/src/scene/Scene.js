"use client";

import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import RotatingPlanet from "@/components/RotatingPlanet";
import Navbar from "@/components/Navbar";
import CameraController from "@/utils/CameraController";
import CustomRenderer from "@/utils/CustomRenderer";
import Effects from "@/utils/Effects";

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
        <CustomRenderer>
            {({ scene, camera }) => (
                <Canvas className="w-full h-full">
                    <CameraController />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 5, 2]} intensity={1} />
                    <Navbar />
                    <Effects />
                    {/*<RotatingPlanet scrollY={scrollY} /> */}
                </Canvas>
            )}
        </CustomRenderer>
    );
}