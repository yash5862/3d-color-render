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

    const onResize = (e) => {

    };

    useEffect(() => {
        adjustWorldCenter();
        // fitCameraToObject(props.camera, model);
        // zoomExtents(props.camera);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
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
        getRenderableObject().scale.multiplyScalar(1 / 100);
        getRenderableObject().traverse( function ( child ) {
            console.log('child', child)
            if ( child.isMesh ) {
                child.geometry.center(); // center here
                zoomExtents(props.camera, child);
            }
        });
    };

    const zoomExtents = (camera, object) => {
        let vFoV = camera.getEffectiveFOV();
        let hFoV = camera.fov * camera.aspect;

        let FoV = Math.min(vFoV, hFoV);
        let FoV2 = FoV / 2;

        let dir = new THREE.Vector3();
        camera.getWorldDirection(dir);

        console.log(getRenderableObject())
        let bb = object.geometry.boundingBox;
        let bs = object.geometry.boundingSphere;
        let bsWorld = bs.center.clone();
        object.localToWorld(bsWorld);

        let th = FoV2 * Math.PI / 180.0;
        let sina = Math.sin(th);
        let R = bs.radius;
        let FL = R / sina;

        let cameraDir = new THREE.Vector3();
        camera.getWorldDirection(cameraDir);

        let cameraOffs = cameraDir.clone();
        cameraOffs.multiplyScalar(-FL);
        let newCameraPos = bsWorld.clone().add(cameraOffs);

        camera.position.copy(newCameraPos);
        camera.lookAt(bsWorld);
        // orbit.target.copy(bsWorld);
        //
        // orbit.update();
    }

    const { viewport } = useThree();
    const extension = getFileExtension(path);
    const model = useLoader(getValidLoader(extension), path);

    console.log('viewport', viewport);

    return model ? <primitive object={getRenderableObject()} scale={scale} position={position} /> : null;
};
export default Model;