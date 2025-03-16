import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Block = ({ position, dimensions, color }) => {
    const blockRef = useRef();
    const edgesRef = useRef();
    const [hovered, setHovered] = useState(false);

    const [width = 1, height = 1, depth = 1] = dimensions;

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const emissiveIntensity = hovered ? 1 : (Math.sin(elapsedTime) + 1) / 2; // Stronger glow when hovered
        if (edgesRef.current) {
            edgesRef.current.material.color = hovered ? new THREE.Color('white') : new THREE.Color(color).multiplyScalar(emissiveIntensity);
            edgesRef.current.layers.set(hovered ? 1 : 0); // Add edges to bloom layer when hovered
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={blockRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial 
                    color={color} 
                    transparent={true} 
                    opacity={0.5} // Set opacity to make the block semi-transparent
                />
            </mesh>
            <lineSegments ref={edgesRef}>
                <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
                <lineBasicMaterial color={color} />
            </lineSegments>
        </group>
    );
};

export default Block;