import { React, useRef, useEffect, useState } from 'react';
import { Canvas,useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Room } from './plane.js';

import * as THREE from 'three';

import { PerspectiveCamera, OrthographicCamera, Bounds, Center } from '@react-three/drei';

import { FirstPersonControls, OrbitControls, PointerLockControls, useHelper } from '@react-three/drei';
import { Box3, CameraHelper, Vector3 } from 'three';

import WasdControls from '../controls/wasdControls.js';
import PlayerControls from '../controls/playerKeyboardControl.js';
import VRControls from '../controls/vrControls.js';

import { VRButton, XR, Controllers } from '@react-three/xr';


function World() {

  const obj = useLoader( GLTFLoader, './assets/Toilet Model.gltf');
  /*
  obj.scene.traverse( (child) => {
    if( child instanceof THREE.Mesh){
      console.log(child)
      child.geometry.scale(0.5,0.5,0.5)
      console.log(child)
    }
  }) */

  //console.log(obj.scene);
  const box = new Box3().setFromObject(obj.scene);
  const size = box.getSize(new THREE.Vector3()).length();
  const cent = box.getCenter(new THREE.Vector3());
  /*console.log(cent)
  obj.scene.position.x += (obj.scene.position.x - cent.x);
  obj.scene.position.y += (obj.scene.position.y - cent.y);
  obj.scene.position.z += (obj.scene.position.z - cent.z);
  */
  const [center, setCenter] = useState({x:1,y:1,z:1});
  const [session, setSession] = useState(false);

  return(
    <div>
      <VRButton />
      <Canvas
        camera={{ up:[0,0,1], fov: 30, near: 10, far: 200000, position: [60, 70, -110]}}>
        <XR
          onSessionStart={(e) => setSession(true)}
          onSessionEnd={(e) => setSession(false)}
        >
        <Controllers />
        <ambientLight color={"#f1f1f1"} />
        <LightComp />
        <axesHelper args={[2000]} />
       
        <mesh position={[cent.x,cent.y,cent.z]}>
          <boxGeometry args={[1,1,1]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>
        <Center>
        <Room 
          obj={obj}
         // center={center}
          //setCenter={setCenter}
        />
        </Center>
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
      <>
        <WasdControls center={props.center} setCenter={props.setCenter} />
        <OrbitControls />
      </>
    )
  else
      return(<>
        <PlayerControls
          center={props.center}
          setCenter={props.setCenter}
        />
        <VRControls />
        <OrthographicCamera makeDefault/>
        </>
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
