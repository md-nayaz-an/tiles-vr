import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { useXR } from '@react-three/xr';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE })
extend({ CameraControls })

// Reference to a set of active KeyboardEvent.code entries


// Rotation logic from three/examples/jsm/controls/PointerLockControls.js
export default function PlayerControls(props) {

  const { player } = useXR();
  const val = useXR();
  
  const codes = useRef(new Set())

  const [flag, setFlag] = useState(false)
  const [initV] = useState(props.center);

  useEffect(() => {
    const onKeyDown = (e) => { codes.current.add(e.code) }
    const onKeyUp = (e) => codes.current.delete(e.code)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    console.log(props.center)

    console.log(val)

    player.position.x = props.center.x;
    player.position.y = props.center.y;
    player.position.z = -props.center.z;
    player.rotation.x = 1.5
    player.up.y = 0;
    
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])



  useFrame((_, delta) => {
    if (codes.current.has('KeyW')) {
      player.position.y += 10
    }
    if (codes.current.has('KeyS')) {
      player.position.y -= 10
    }
    if (codes.current.has('KeyA')) {
      player.position.x -= 10
    }
    if (codes.current.has('KeyD')) {
      player.position.x += 10
    }
    if (codes.current.has('KeyE')) {
      player.position.z += 10
    }
    if (codes.current.has('KeyQ')) {
      player.position.z -= 10
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