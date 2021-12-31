import { Canvas, useFrame } from '@react-three/fiber'
import CameraControls from "./orbitControls";
import { AdaptiveDpr } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Plane } from './plane';
import TireModel from "./tire.model";

const Model = (props) => {

    return <Canvas gl={{ alpha: true }} camera={{ fov: 75, position: [0, -1, 5] }}>
        <CameraControls />
        <AdaptiveDpr pixelated={true} />
        <directionalLight position={[10, 10, 5]} color={0xF8F0E3} intensity={0.9} />
        <directionalLight position={[-10, 10, 5]} color={0xF8F0E3} intensity={0.9} />
        <directionalLight position={[0, 0, 6]} color={0xF8F0E3} intensity={0.5} />
        <directionalLight position={[0, 0, -6]} color={0xF8F0E3} intensity={0.5} />
        {/*<ambientLight intensity={0.5} />*/}
        <Physics>
            <TireModel
                key={"TireModel"}
                path="/tire2.gltf"
                scale={[1, 1, 1]}
                position={[0, 0, 0]}
                boundingBox={false}
                renderPriority={2}
            />
            <Plane />
        </Physics>
    </Canvas>;

}

export default Model;