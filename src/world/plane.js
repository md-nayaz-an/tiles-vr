import React, {useRef, useEffect, useContext} from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

import { useHelper, useTexture } from '@react-three/drei';

import { BoxHelper, RepeatWrapping, TextureLoader } from 'three';

import imgSelectorContext from '../contexts';

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

export function Room() {

  const obj = useLoader( GLTFLoader, './assets/Toilet Model.gltf');
  console.log(obj)//[Object.keys(obj.nodes)[0]]);
  const imgContext = useContext(imgSelectorContext);
  
  const texture = useLoader(TextureLoader ,`./assets/textures/${imgContext}`);
  texture.flipY = false;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  useEffect(() => {
    console.log(texture);
    console.log(obj.materials['M_03_ceramic_2']);
    const val = obj.materials['M_03_ceramic_2'].map;
    //comparer(val,texture);
     Object.assign(obj.materials['M_03_ceramic_2'], {
      map: texture,
    });


    return;
  }, [imgContext]);

  return(
    <>
      {
        Object.entries(obj.nodes).map(([index, node])  => {
          if(typeof node.material !== 'undefined') {
            if(node.material.name === 'M_03_ceramic_2') {
          //    console.log(node);
          //    return(<LoadPrimitive key={index} object={node} texture={imgContext} />)
            }
          }
          return(<LoadPrimitive key={index} object={node} texture={null} />)
        })
      }
    </>
  )
}
function LoadPrimitive(props) {
  const ref = useRef();
  //useHelper(ref, BoxHelper)
  if(props.texture !== null) {
  }

  return(
    <primitive
      ref={ref}
      rotation-x={Math.PI / 2}
      object={props.object}
      //onClick={(e) => console.log(e.object.name)}
    />
  )
}