import { useEffect, useRef } from "react";
import { WebGLRenderer, PerspectiveCamera, Scene } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

export function createCustomRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
}

function CustomRenderer({ children }) {
    const mountRef = useRef();
    const rendererRef = useRef();
    const cameraRef = useRef();
    const sceneRef = useRef();
    const composerRef = useRef();

    useEffect(() => {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // Create renderer
        rendererRef.current = createCustomRenderer();
        mountRef.current.appendChild(rendererRef.current.domElement);

        // Create camera
        cameraRef.current = new PerspectiveCamera(75, width / height, 0.1, 1000);
        cameraRef.current.position.z = 5;

        // Create scene
        sceneRef.current = new Scene();

        // Create composer for post-processing
        composerRef.current = new EffectComposer(rendererRef.current);
        const renderPass = new RenderPass(sceneRef.current, cameraRef.current);
        composerRef.current.addPass(renderPass);

        // Add FXAA pass
        const fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.material.uniforms['resolution'].value.set(1 / width, 1 / height);
        composerRef.current.addPass(fxaaPass);

        // Handle window resize
        const handleResize = () => {
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            rendererRef.current.setSize(width, height);
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            composerRef.current.setSize(width, height);
            fxaaPass.material.uniforms['resolution'].value.set(1 / width, 1 / height);
        };
        window.addEventListener("resize", handleResize);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            composerRef.current.render();
        };
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            mountRef.current.removeChild(rendererRef.current.domElement);
        };
    }, []);

    return (
        <div ref={mountRef} className="fixed top-0 left-0 w-full h-full">
            {children({ scene: sceneRef.current, camera: cameraRef.current })}
        </div>
    );
}

export default CustomRenderer;