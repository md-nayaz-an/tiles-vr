import { useFrame } from '@react-three/fiber'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import ThreeMeshUI from 'three-mesh-ui'

export default function Button(props) {
  const button = useRef()

  useFrame(() => {
    button.current.frame.layers.set(0)
    ThreeMeshUI.update();
  })

  useEffect(() => {
    button.current.setupState({
      state: 'hovered',
      attributes: {
        offset: 0.05,
        backgroundColor: new THREE.Color(0x999999),
        backgroundOpacity: 1,
        fontColor: new THREE.Color(0xffffff)
      }
    })
    button.current.setupState({
      state: 'idle',
      attributes: {
        offset: 0.035,
        backgroundColor: new THREE.Color(0x666666),
        backgroundOpacity: 0.3,
        fontColor: new THREE.Color(0xffffff)
      }
    })
    button.current.setupState({
      state: 'selected',
      attributes: {
        offset: 0.02,
        backgroundColor: new THREE.Color(0x777777),
        fontColor: new THREE.Color(0x222222)
      }
    })
    ThreeMeshUI.update()
  })
  return (
    <block
      ref={button}
      onPointerEnter={() => button.current.setState('hovered')}
      onPointerLeave={() => button.current.setState('idle')}
      onPointerDown={() => button.current.setState('selected')}
      onPointerUp={() => {
        button.current.setState('hovered')
        props.onClick()
      }}
      backgroundTexture={props.bg}
      args={[
        {
          width: 0.5,
          height: 0.2,
          justifyContent: 'center',
          borderRadius: 0.075,
          margin: 0.025
        }
      ]}>
    </block>
  )
}
