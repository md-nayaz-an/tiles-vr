import { React, useRef, useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { Room } from './plane.js';

import { OrbitControls, useHelper } from '@react-three/drei';
import { OrthographicCamera } from '@react-three/drei';
import { CameraHelper, PointLightHelper, SpotLightHelper } from 'three';

import LookControls from '../controls/lookControls.js';
import WasdControls from '../controls/wasdControls.js';
import { VRButton, XR, Controllers } from '@react-three/xr';

function World() {

  return(
    <div>
      <VRButton />
      <Canvas
        camera={{ up:[0,0,1], fov: 50, near: 10, far: 20000, position: [90, 150,75]}}>
        <XR>
        <Controllers />
        <ambientLight color={"#f1f1f1"} />
        <LightComp />
        <axesHelper args={[2000]} />
        <Room />
        <WasdControls />
        <OrbitControls
            target={[90,150,80]}
            enableZoom={false}
          />
        </XR>
      </Canvas>
    </div>
  )
}

function LightComp() {
  const light1 = useRef();
  const light2 = useRef();
  const light3 = useRef();

  return(
    <>
      <pointLight ref={light1} color={'#ffffff'} position={[85,74,105]}/>
      <pointLight ref={light2} color={'#ffffff'} position={[85,128,105]}/>
      <pointLight ref={light3} color={'#ffffff'} position={[70,166,105]}/>
    </>
  )
}
export { World };
