import {useFrame, useThree, extend} from "@react-three/fiber";
import {useRef} from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls })

const CameraControls = () => {
    const {
        camera,
        gl: { domElement },
    } = useThree();
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return (
        // @ts-ignore
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={false}

            enablePan={false}

            minPolarAngle={Math.PI/2}
            maxPolarAngle={Math.PI/2}

            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
        />
    );
};

export default CameraControls;
