import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { useXR } from '@react-three/xr';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE })
extend({ CameraControls })

// Reference to a set of active KeyboardEvent.code entries


// Rotation logic from three/examples/jsm/controls/PointerLockControls.js
export default function WasdControls(props) {

  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const { player } = useXR();
  
  const camControls = useRef();
  const codes = useRef(new Set())

  const [flag, setFlag] = useState(false)
  const [initV] = useState(props.center);
  

  useEffect(() => {
    const onKeyDown = (e) => { codes.current.add(e.code) }
    const onKeyUp = (e) => codes.current.delete(e.code)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    
    camControls.current.reset(true)
    camControls.current.enabled = false;
    camera.position.x = props.center.x;
    camera.position.y = props.center.y;
    camera.position.z = -props.center.z;
    camControls.current.setLookAt(10,10,10,0,100,0,true)
    
    const v = props.center
    camControls.current.setOrbitPoint(v.x,v.y,v.z);
    console.log(props.center)
    console.log(camControls.current.getPosition())
    console.log(camera)
    return () => {
      //props.setCenter(props.center)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])



  useFrame((_, delta) => {
    if (codes.current.has('KeyW')) {
      camControls.current.forward( 5, true)
      setFlag(!flag);
    }
    if (codes.current.has('KeyS')) {
      camControls.current.forward( -5, true)
      setFlag(!flag);
    }
    if (codes.current.has('KeyA')) {
      camControls.current.truck( -5, 0, true)
      setFlag(!flag);
    }
    if (codes.current.has('KeyD')) {
      camControls.current.truck( 5, 0, true)
      setFlag(!flag);
    }
    if (codes.current.has('KeyE')) {
      camControls.current.truck( 0, -5, true)
      setFlag(!flag);
    }
    if (codes.current.has('KeyQ')) {
      camControls.current.truck( 0, 5, true)
      setFlag(!flag);
    }
    if (codes.current.has('ArrowUp')) {
      camControls.current.rotate( 0 , 0.025, true);
    }
    if (codes.current.has('ArrowDown')) {
      camControls.current.rotate( 0, -0.025, true);
    }
    if (codes.current.has('ArrowLeft')) {
      camControls.current.rotate( 0.025 , 0, true);
    }
    if (codes.current.has('ArrowRight')) {
      camControls.current.rotate( -0.025 , 0, true);
    }
    if (codes.current.has('KeyR')) {
      console.log(initV)
      camControls.current.setPosition(initV.x, initV.y, -initV.z, true)
    }
    
    if(flag) {
      let pos = camera.position
      //console.log(pos);
      //props.setCenter(pos);
      //console.log(props.center)
      setFlag(!flag);
    }
    camControls.current.update(delta)
    //console.log(camControls.current.getPosition())
  })

  return (
    <cameraControls ref={camControls} args={[camera, gl.domElement]} />
  )
}