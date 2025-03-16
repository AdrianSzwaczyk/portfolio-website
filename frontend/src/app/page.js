"use client";

import { useState, useEffect } from "react";
import Scene from "../scene/Scene"; // Import Three.js scene

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      const delta = event.deltaY;
      window.scrollBy({ top: delta, behavior: "smooth" });
    };
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 3000);
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="bg-black text-white min-h-screen relative overflow-hidden">
      <Scene /> {/* Three.js Scene as background */}
      <div style={{ height: '200vh' }}></div> {/* Large container to enable scrolling */}
    </main>
  );
}
