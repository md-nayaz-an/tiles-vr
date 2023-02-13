import * as THREE from 'three';
import { useEffect, useRef } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { useXR } from '@react-three/xr';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE })
extend({ CameraControls })

// Reference to a set of active KeyboardEvent.code entries
const useCodes = () => {
  const codes = useRef(new Set())
  useEffect(() => {
    const onKeyDown = (e) => codes.current.add(e.code)
    const onKeyUp = (e) => codes.current.delete(e.code)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])
  return codes
}


// Rotation logic from three/examples/jsm/controls/PointerLockControls.js
export default function WasdControls() {
  const { player } = useXR();
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const camControls = useRef();

  const code = useCodes();
  
  useFrame((_, delta) => {
    if (code.current.has('KeyW')) {
      camControls.current.forward( 10 * delta, false)
    }
    if (code.current.has('KeyS')) {
      camControls.current.forward( -10 * delta, false)
    }
    if (code.current.has('KeyA')) {
      camControls.current.truck( -10 * delta, 0, false)
    }
    if (code.current.has('KeyD')) {
      camControls.current.truck( 10 * delta, 0, false)
    }
    if (code.current.has('ArrowUp')) {
      camControls.current.rotate(0, -50 * THREE.MathUtils.DEG2RAD * delta, 0, true );
    }
    if (code.current.has('ArrowDown')) {
      camControls.current.rotate(0, 50 * THREE.MathUtils.DEG2RAD * delta, 0, true);
    }
    if (code.current.has('ArrowLeft')) {
      camControls.current.rotate(- 100 * THREE.MathUtils.DEG2RAD * delta, 0, true);
    }
    if (code.current.has('ArrowRight')) {
      camControls.current.rotate( 100 * THREE.MathUtils.DEG2RAD * delta, 0, true);
    }
    camControls.current.update(delta)
  })
  return (
    <cameraControls ref={camControls} args={[camera, gl.domElement]} />
  )
}