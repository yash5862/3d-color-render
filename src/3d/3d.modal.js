import { useEffect, useState } from 'react';
import {BoxProps, Triplet, useBox} from "@react-three/cannon";
import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from 'three';

const TireModel = (props) => {
    let {
        path,
        scale,
        rotation,
        position = [0, 0, 0]
    } = props;

    const model = useLoader(GLTFLoader, path);

    useEffect(() => {
        if (model) {
            model.scene.traverse((o) => {
                if (o.isMesh && o.material != null) {
                    o.material.color = new THREE.Color( props.color );
                    // o.material = new THREE.MeshBasicMaterial({color: 0xFF9B86})
                }
            });
        }
    }, [props.color])

    const [ref] = useBox((index) => ({
        mass: 0,
        rotation
    }));
    return (
        <group ref={ref}>
            <primitive object={model.scene} scale={scale} position={position} />
        </group>
    );
};
export default TireModel;