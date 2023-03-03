import { React, useRef, useEffect, useState, Suspense } from 'react';
import { Canvas,useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Room } from './plane.js';

import * as THREE from 'three';

import { PerspectiveCamera, OrthographicCamera, Bounds, Center, Billboard, MeshReflectorMaterial, CubeCamera } from '@react-three/drei';

import { FirstPersonControls, OrbitControls, PointerLockControls, useHelper } from '@react-three/drei';
import { Box3, CameraHelper, CubeUVReflectionMapping, Mesh, Vector3 } from 'three';

import WasdControls from '../controls/wasdControls.js';
import PlayerControls from '../controls/playerKeyboardControl.js';
import VRControls from '../controls/vrControls.js';

import Panel from '../xrui/imageSelector.js';

import { VRButton, XR, Controllers } from '@react-three/xr';
import StatsVR from "statsvr";


function World() {


  const [scale, setScale] = useState(0.028);

  const [session, setSession] = useState(false);
  return(
    <div>
      <VRButton />
      <Canvas>
        <perspectiveCamera 
          makeDefault
          aspect={1200/600}
          radius={(1200 + 600) / 4}
          fov={75}
        />
        <XR
          onSessionStart={(e) => setSession(true)}
          onSessionEnd={(e) => setSession(false)}
        >
        <Controllers />
        <ambientLight color={"#f1f1f1"} />
        <LightComp />
        <axesHelper args={[20]} />
       
        <Suspense>
          <Center disableY={true}>
            <mesh scale={scale} visible={true}>
              <Room
                session={session}
                scale={scale}
                setScale={setScale}
              />
            </mesh>
          </Center>
        </Suspense>

        

        <OrbitControls />
        <LightComp />

        <Controls
          session={session}
          scale={scale}
          setScale={setScale}
        />
        <color args={["#eee"]} attach="background" />
        </XR>
      </Canvas>
    </div>
  )
}

function Controls(props) {
  
  /*
  const { scene, camera } = useThree();
  const statsVR = new StatsVR(scene, camera);
  statsVR.setX(3)
  statsVR.setY(3)
  statsVR.setZ(-10)
  
  useFrame(() => {
    statsVR.setCustom1('scale:' + props.scale)
    statsVR.update()
  })
  */
  if(!props.session) {
    return (
      <>
      </>
    )
      }
  else
      return(<>
        <PlayerControls
          scale={props.scale}
          setScale={props.setScale}
        />
        <VRControls 
          scale={props.scale}
          setScale={props.setScale}
        />
        </>
      )
}

function LightComp() {
  const light1 = useRef();
  const light2 = useRef();
  const light3 = useRef();

  return(
    <>
      <pointLight ref={light1} color={'#ffffff'} position={[10,10,10]}/>
      <pointLight ref={light2} color={'#ffffff'} position={[85,128,105]}/>
      <pointLight ref={light3} color={'#ffffff'} position={[70,166,105]}/>
    </>
  )
}
export { World };
