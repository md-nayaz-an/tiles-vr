import React, {useRef, useEffect, useContext} from 'react';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';

import { useHelper, useTexture } from '@react-three/drei';

import { Box3, BoxHelper, RepeatWrapping, TextureLoader } from 'three';

import { BBAnchor } from '@react-three/drei';

import imgSelectorContext from '../contexts';
import LoadTilePrimitive from './tileInteractivity';

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
  console.log(tileObj)//[Object.keys(obj.nodes)[0]]);

  const obj = tileObj.scene.clone();
  const { nodes, materials } = tileObj;
  console.log(nodes);
  
  const texture = useLoader(TextureLoader ,`./assets/textures/${imgContext}`);
  texture.flipY = false;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  console.log(texture)
  
  const { camera, scene } = useThree();
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

  return(
    <>
      {//<primitive rotation-x={Math.PI/2} object={obj}/>
      }{
        Object.entries(nodes).map(([index, node])  => {
          if(typeof node.material !== 'undefined') {
            if(node.material.name === 'M_03_ceramic_2') {
              console.log("***tiles:" + node.name);
              return(
                <LoadTilePrimitive
                  key={index}
                  node={node}
                  texture={imgContext}
                  material={materials['M_03_ceramic_2']}
                />)
            return
            }
          }
          return(<LoadPrimitive key={index} node={node} />)
        })
      }
    </>
  )
}


function LoadPrimitive(props) {
  const ref = useRef();

  return(
    <primitive
      ref={ref}
      rotation-x={Math.PI / 2}
      object={props.node}
      //onClick={(e) => console.log(e.object.name)}
    />
  )
}


