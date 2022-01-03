import { useEffect, useState } from 'react';
import {BoxProps, Triplet, useBox} from "@react-three/cannon";
import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from 'three';
import { getFileExtension } from '../utils/utils';

const TireModel = (props) => {
    let {
        path,
        scale,
        rotation,
        position = [0, 0, 0]
    } = props;

    useEffect(() => {
        if (getRenderableObject()) {
            getRenderableObject().traverse((o) => {
                if (o.isMesh && o.material != null) {
                    o.material.color = new THREE.Color( props.color );
                    // o.material = new THREE.MeshBasicMaterial({color: 0xFF9B86})
                }
            });
        }
    }, [props.color])

    const getRenderableObject = () => {
        if (extension == 'gltf' || extension == 'glb') {
            return model.scene;
        } else {
            return model;
        }
    }

    const getValidLoader = () => {
        if (extension == 'gltf' || extension == 'glb') {
            return GLTFLoader;
        } else if (extension == 'obj') {
            return OBJLoader;
        } else if (extension == 'fbx') {
            return FBXLoader;
        }
    }

    const extension = getFileExtension(path);
    const model = useLoader(getValidLoader(extension), path);

    return model ? <primitive object={getRenderableObject()} scale={scale} position={position} /> : null;
};
export default TireModel;