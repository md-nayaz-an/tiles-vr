import React, {useRef, useEffect, useContext, useState} from 'react';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';

import { CubeCamera, useHelper, useTexture} from '@react-three/drei';

import { Box3, BoxHelper, CubeReflectionMapping, EquirectangularReflectionMapping, RepeatWrapping, TextureLoader, Vector3 } from 'three';

import { BBAnchor } from '@react-three/drei';

import ThreeMeshUI from 'three-mesh-ui';

import imgSelectorContext from '../contexts';
import LoadTilePrimitive from './tileInteractivity';
import { useController } from '@react-three/xr';

import { useCodes } from '../controls/wasdControls';

export function Room(props) {

  const imgContext = useContext(imgSelectorContext);

  const code = useCodes();
  
  const obj = useLoader( GLTFLoader, './assets/scene(3).gltf');
  console.log(obj);

  const { nodes, materials } = obj

  let envTexture;

  const texture = useLoader(TextureLoader ,`./assets/textures/${imgContext.imgSrc}`);
  texture.flipY = false;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  const itemData = [
    'Blonde-Sandstone-Architextures.jpg',
    'Calacatta-Vena-Architextures.jpg',
    'Travertine-Architextures.jpg',
  
    'Granite-Architextures.jpg',
    'Green-Marble-Architextures.jpg',
    //'grungy-gray-marble-textured-background.jpg',
    
    'M_02_ceramic_3.jpg',
    'M_03_ceramic_1.jpg',
    'M_03_ceramic_2.jpg',
    
    'M_03_go_cua.jpg',
    'M_05_inox2.png',
    'Polished-Concrete-Architextures.jpg'
  ];




/*
  const controller = useController('right');


  let i = 0;
  
  useFrame((_, delta) => {
    if(controller) {
      i += delta
      const { buttons } = controller.inputSource.gamepad;
      
			if(buttons[5].pressed && i>0.4){
        i = 0
        let loc = itemData.indexOf(imgContext.imgSrc);
        if(loc === itemData.length - 1)
          loc = 0
        imgContext.setImgSrc(itemData[loc+1])
			}

			if(buttons[4].pressed && i>0.4){
        i = 0
        let loc = itemData.indexOf(imgContext.imgSrc);
        if(loc === 0)
          loc = itemData.length - 1
        imgContext.setImgSrc(itemData[loc-1])
			}
      
    }

    if(code.current.has('KeyP')) {

      let loc = itemData.indexOf(imgContext.imgSrc);
      if(loc === itemData.length - 1)
        loc = 0
      imgContext.setImgSrc(itemData[loc+1])
    }

    if(code.current.has('KeyO')) {
      let loc = itemData.indexOf(imgContext.imgSrc);
      if(loc === 0)
        loc = itemData.length - 1
      imgContext.setImgSrc(itemData[loc-1])
    }

    if(code.current.has('KeyI')) {
      props.setScale(props.scale + 0.001)
    }

    if(code.current.has('KeyU')) {
      props.setScale(props.scale - 0.001)
    }
  }) */
  return(
    <>
    <CubeCamera visible={false}>
      {(texture) => {
        envTexture = texture
      }}
    </CubeCamera>
      
      {
      
        Object.entries(nodes).map(([index, node])  => {
          if(typeof node.material !== 'undefined') {
            if(node.material.name === 'M_03_ceramic_2') {
              return(
                <LoadTilePrimitive
                  key={index}
                  node={node}
                  imgContext={imgContext}
                  texture={texture}
                  scale={props.scale}
                />)
            }
          }
          
          if(node.name === "Mesh2_Object_56_1_Group1_Model"){
              return(
                        <mesh
                          geometry={node.geometry}  
                        >
                          <meshPhysicalMaterial
                            color={'#ffffff'}
                            emissive={'#000000'}
                            roughness={0.5}
                            metalness={1}
                            reflectivity={1}
                            envMap={envTexture}
                            envMapIntensity={40}
                            />
                        </mesh>
              )
          }
             
          return(<LoadPrimitive key={index} node={node} scale={props.scale} />)
        })
      
      }
    </>
  )
}


function LoadPrimitive(props) {
  return(
    <mesh
      //scale={props.scale}
      geometry={props.node.geometry}
      material={props.node.material}
    />
  )
}


