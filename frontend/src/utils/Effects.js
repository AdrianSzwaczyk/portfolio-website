import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { Vector2 } from "three";

extend({ EffectComposer, RenderPass, UnrealBloomPass });

function Effects() {
    const { gl, scene, camera } = useThree();
    const composer = useRef();
    const bloomPass = useRef();

    useEffect(() => {
        const renderScene = new RenderPass(scene, camera);
        bloomPass.current = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.current.threshold = 0;
        bloomPass.current.strength = 5; // Intensity of glow
        bloomPass.current.radius = 0.3;

        composer.current = new EffectComposer(gl);
        composer.current.addPass(renderScene);
        composer.current.addPass(bloomPass.current);
    }, [gl, scene, camera]);

    useFrame(() => {
        if (composer.current) {
            composer.current.render();
        }
    }, 1);

    return null;
}

export default Effects;