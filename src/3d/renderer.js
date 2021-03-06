import {Canvas, useFrame, useThree} from '@react-three/fiber'
import CameraControls from "./orbitControls";
import { AdaptiveDpr } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Plane } from './plane';
import Model from './3d.modal';
import React, {useEffect} from "react";

const AdaptivePixelRatio = () => {
    const current = useThree((state) => state.performance.current)
    const setPixelRatio = useThree((state) => state.setPixelRatio)
    useEffect(() => {
        setPixelRatio(window.devicePixelRatio * current)
    }, [current])
    return null
}

const Renderer3D = (props) => {

    const {
        camera,
        gl: { domElement },
    } = useThree();

    return <>
        <CameraControls camera={camera} domElement={domElement}/>
        <AdaptiveDpr pixelated={true} />
        <directionalLight position={[10, 10, 5]} color={0xF8F0E3} intensity={0.9} />
        <directionalLight position={[-10, 10, 5]} color={0xF8F0E3} intensity={0.9} />
        <directionalLight position={[0, 0, 6]} color={0xF8F0E3} intensity={0.5} />
        <directionalLight position={[0, 0, -6]} color={0xF8F0E3} intensity={0.5} />
        {/*<ambientLight intensity={0.5} />*/}
        <Physics>

            <Model path={props.path}
                   scale={props.scale}
                   position={props.position}
                   renderPriority={props.renderPriority}
                   color={props.color}
                   camera={camera}
                   exportFlag={props.exportFlag}
            />

            <Plane />
        </Physics>
    </>;

}

export default Renderer3D;