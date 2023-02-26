import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { useXR } from '@react-three/xr';

// Reference to a set of active KeyboardEvent.code entries


// Rotation logic from three/examples/jsm/controls/PointerLockControls.js
export default function PlayerControls(props) {

  const { player } = useXR();
  const val = useXR();
  console.log(val);
  const { gl,scene, camera } = useThree();
  camera.matrixAutoUpdate = false
  const codes = useRef(new Set())

  const [flag, setFlag] = useState(false)

  
  useEffect(() => {
    const onKeyDown = (e) => { codes.current.add(e.code) }
    const onKeyUp = (e) => codes.current.delete(e.code)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

/*
    player.position.x = props.center.x;
    player.position.y = props.center.y;
    player.position.z = -props.center.z; */
   
    

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])


  const speed = 5
  useFrame((_, delta) => {


    if (codes.current.has('KeyW')) {
      player.position.y += speed

    }
    if (codes.current.has('KeyS')) {
      player.position.y -= speed
    }
    if (codes.current.has('KeyA')) {
      player.position.x -= speed
    }
    if (codes.current.has('KeyD')) {
      player.position.x += speed
    }
    if (codes.current.has('KeyE')) {
      player.position.z += speed
    }
    if (codes.current.has('KeyQ')) {
      player.position.z -= speed
    }
    if (codes.current.has('ArrowUp')) {
}
    if (codes.current.has('ArrowDown')) {
    }
    if (codes.current.has('ArrowLeft')) {

    }
    if (codes.current.has('ArrowRight')) {
      }
    if (codes.current.has('KeyR')) {
    }
  })

  return 
}