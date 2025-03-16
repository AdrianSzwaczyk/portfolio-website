import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const CameraController = () => {
    const { camera } = useThree();

    useEffect(() => {
        // Set the initial camera position
        camera.position.set(0, 0, 3); // Adjust this value to bring the camera closer

        const handleMouseMove = (event) => {
            const { innerWidth, innerHeight } = window;
            const mouseX = -(event.clientX / innerWidth) * 2 + 1;
            const mouseY = -(event.clientY / innerHeight) * 2 + 1;

            const maxAngle = 0.5; // Limit the angle
            camera.rotation.y = mouseX * maxAngle;
            camera.rotation.x = mouseY * maxAngle;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [camera]);

    return null;
};

export default CameraController;