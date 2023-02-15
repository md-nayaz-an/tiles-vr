import { React, useRef, useEffect, useState } from 'react';
import { Canvas,useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Room } from './plane.js';

import { FirstPersonControls, OrbitControls, PointerLockControls, useHelper } from '@react-three/drei';
import { OrthographicCamera } from '@react-three/drei';
import { Box3, CameraHelper, Vector3 } from 'three';

import WasdControls from '../controls/wasdControls.js';
import PlayerControls from '../controls/playerControl.js';

import { VRButton, XR, Controllers } from '@react-three/xr';

function World() {

  const obj = useLoader( GLTFLoader, './assets/Toilet Model.gltf');
  const box = new Box3().setFromObject(obj.scene);
  const [center, setCenter] = useState(box.getCenter(new Vector3()));
  const [session, setSession] = useState(false);

  return(
    <div>
      <VRButton />
      <Canvas
        camera={{ up:[0,0,1], fov: 50, near: 10, far: 200000, position: [center.x, center.y, -center.z]}}>
        <XR
          onSessionStart={(e) => setSession(true)}
          onSessionEnd={(e) => setSession(false)}
        >
        <Controllers />
        <ambientLight color={"#f1f1f1"} />
        <LightComp />
        <axesHelper args={[2000]} />

        <Room 
          obj={obj}
          center={center}
          setCenter={setCenter}
        />
        
        <Controls
          session={session}
          center={center}
          setCenter={setCenter}
        />

        </XR>
      </Canvas>
    </div>
  )
}

function Controls(props) {
  if(!props.session)
    return (
      <WasdControls
          center={props.center}
          setCenter={props.setCenter}
      />
    )
  else
      return(
        <PlayerControls
          center={props.center}
          setCenter={props.setCenter}
        />
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
