import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import ThreeMeshUI from 'three-mesh-ui'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader, RepeatWrapping } from 'three'
import Button from './button'

import imgSelectorContext from '../contexts'

extend(ThreeMeshUI)

const itemData = [
  'Blonde-Sandstone-Architextures.jpg',
  'Calacatta-Vena-Architextures.jpg',
  'Granite-Architextures.jpg',
  'Green-Marble-Architextures.jpg',
  //'grungy-gray-marble-textured-background.jpg',
  'M_02_ceramic_3.jpg',
  'M_03_ceramic_1.jpg',
  'M_03_ceramic_2.jpg',
  'M_03_go_cua.jpg',
  'M_05_inox2.png',
  'Travertine-Architextures.jpg'
];

export default function Panel() {

  
  const imgContext = useContext(imgSelectorContext);

  const texture = useLoader(TextureLoader ,`./assets/textures/${imgContext.imgSrc}`);
  texture.flipY = false;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  useFrame(() => {
    ThreeMeshUI.update()
  })

  const showPrev = () => {
    let loc = itemData.indexOf(imgContext.imgSrc);
    if(loc === 0)
      loc = itemData.length - 1;
    imgContext.setImgSrc(itemData[loc-1])
  }

  const showNext = () => {

  }

  useEffect(() => {
    ThreeMeshUI.update()
    return
  }, [])

  return (
    <>
    <block
      args={[
        {
          fontSize: 0.1,
          backgroundOpacity: 0.5,
          fontFamily: './Roboto-msdf.json',
          fontTexture: './Roboto-msdf.png'
        }
      ]}>
        <Button 
          content={'Prev'}
          onClick={showPrev}
          bg={texture}
          />
        <Button
          content={'Next'}
          onClick={showNext}
          />
      <block
        args={[
          {
            height: 0.8,
            width: 1.5,
            justifyContent: 'center',
            contentDirection: 'row',
            margin: 0.025
          }
        ]}
        >
      </block>
    </block>
    </>
  )
}
