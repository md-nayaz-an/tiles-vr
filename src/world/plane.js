import React, {useRef, useEffect, useContext} from 'react';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';

import { useHelper, useTexture } from '@react-three/drei';

import { Box3, BoxHelper, RepeatWrapping, TextureLoader, Vector3 } from 'three';

import { BBAnchor } from '@react-three/drei';

import ThreeMeshUI from 'three-mesh-ui';

import imgSelectorContext from '../contexts';
import LoadTilePrimitive from './tileInteractivity';
import { useController } from '@react-three/xr';

const comparer = (obj1, obj2, i=0) => {
  Object.keys(obj1).map(key => {
    if(obj1[key] === null)
      console.log(' '.repeat(i) + key + ':' + obj1[key] + ' | ' + obj2[key]);      
    else if(typeof obj1[key] === 'object')
      comparer(obj1[key], obj2[key], i+1);
    else
      console.log(' '.repeat(i) + key + ':   ' + obj1[key] + ' | ' + obj2[key]);
  })
}


export function Room(props) {

  const imgContext = useContext(imgSelectorContext);

  const tileObj = props.obj;
  //console.log(tileObj)//[Object.keys(obj.nodes)[0]]);

  const obj = tileObj.scene.clone();
  const { nodes, materials } = tileObj;
  //console.log(nodes);
  
  const texture = useLoader(TextureLoader ,`./assets/textures/${imgContext.imgSrc}`);
  texture.flipY = false;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  //console.log(texture)
  const { scene, camera } = useThree();

  const itemData = [
    'Blonde-Sandstone-Architextures.jpg',
    'Calacatta-Vena-Architextures.jpg',
    'Travertine-Architextures.jpg',
  
    'Granite-Architextures.jpg',
    'Green-Marble-Architextures.jpg',
    'grungy-gray-marble-textured-background.jpg',
    
    'M_02_ceramic_3.jpg',
    'M_03_ceramic_1.jpg',
    'M_03_ceramic_2.jpg',
    
    'M_03_go_cua.jpg',
    'M_05_inox2.png',
    'Polished-Concrete-Architextures.jpg'
  ];
  

  /*useEffect(() => {
    if (props.session) {
      scene.scale.set(0.5,0.5,0.5);
      scene.rotateOnAxis({x:0,y:0,z:1}, Math.PI / 4)
    }
      console.log(scene)
    return
  }, [props.session])
*/

  useEffect(() => {
    /*
    Object.entries(nodes).map(([index, node])  => {
      if(typeof node.material !== 'undefined') {
        if(node.material.name === 'M_03_ceramic_2') {
          console.log("***tiles:" + node.name);
          let remove = obj.getObjectByName(index)
          remove.visible = false
          let parent = remove.parent;
          parent.remove(remove);
          //return(<LoadPrimitive key={index} object={node} texture={imgContext} />)
        }
      //return(<LoadPrimitive key={index} object={node} texture={null} />)
      }
    })
    */

    //console.log(texture);
    //console.log(obj.materials['M_03_ceramic_2']);
    const val = materials['M_03_ceramic_2'].map;
    //comparer(val,texture);
    Object.assign(materials['M_03_ceramic_2'], {
      map: texture,
    });
   
    return;
  }, [imgContext]);


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

  })
  return(
    <>
      {//<primitive rotation-x={Math.PI/2} object={obj}/>
      }{
        Object.entries(nodes).map(([index, node])  => {
          if(typeof node.material !== 'undefined') {
            if(node.material.name === 'M_03_ceramic_2') {
              //console.log("***tiles:" + node.name);
              return(
                <LoadTilePrimitive
                  key={index}
                  node={node}
                  imgContext={imgContext}
                  texture={texture}
                  material={materials['M_03_ceramic_2']}
                  scale={props.scale}
                />)
            return
            }
          }
          return(<LoadPrimitive key={index} node={node} scale={props.scale} />)
        })
      }
    </>
  )
}


function LoadPrimitive(props) {
  const ref = useRef();


  return(
    <mesh
      scale={props.scale}
      ref={ref}
      geometry={props.node.geometry}
      material={props.node.material}
      //onClick={(e) => console.log(e.object.name)}
    />
  )
}


