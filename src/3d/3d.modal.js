import React, { useEffect } from 'react';
import {useLoader, useThree} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from 'three';
import { getFileExtension } from '../utils/utils';

const Model = (props) => {
    let {
        path,
        scale,
        rotation,
        position = [0, 0, 0]
    } = props;

    useEffect(() => {
        autoScaleAndFit();
        adjustWorldCenter();
    }, []);

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

    const adjustWorldCenter = () => {
        getRenderableObject().traverse( function ( child ) {
            if ( child.isMesh ) {
                child.geometry.center(); // center here
            }
        });
    };

    const autoScaleAndFit = () => {
        let mroot = getRenderableObject();
        let bbox = new THREE.Box3().setFromObject(mroot);
        let cent = bbox.getCenter(new THREE.Vector3());
        let size = bbox.getSize(new THREE.Vector3());

        //Rescale the object to normalized space
        let maxAxis = Math.max(size.x, size.y, size.z);
        mroot.scale.multiplyScalar(3.0 / maxAxis);
        bbox.setFromObject(mroot);
        bbox.getCenter(cent);
        bbox.getSize(size);
        //Reposition to 0,halfY,0
        mroot.position.copy(cent).multiplyScalar(-1);
        mroot.position.y-= (size.y * 0.5);
    }

    const extension = getFileExtension(path);
    const model = useLoader(getValidLoader(extension), path);


    return model ? <primitive object={getRenderableObject()} scale={scale} position={position} /> : null;
};
export default Model;
