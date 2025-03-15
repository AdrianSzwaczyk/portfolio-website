import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber'; 

function RotatingPlanet({ scrollY }) {
    const planetRef = useRef();

    useFrame(() => {
        if (planetRef.current) {
            planetRef.current.rotation.z = -scrollY * 0.03;
            planetRef.current.position.z = scrollY * 0.03;
        }
    });

    return (
        <mesh ref={planetRef} position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
}

export default RotatingPlanet;