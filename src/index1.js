import { Canvas } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Controllers, XR } from '@react-three/xr';

function AppMain() {
  return(
      <Canvas>
        <XR>
        <Controllers />
        <Center>
          <mesh scale={1}>
            <boxGeometry args={[100,100,100]} />
            <meshStandardMaterial color={'red'} />
          </mesh>
        </Center>
        <ambientLight />
        <perspectiveCamera />
        </XR>
      </Canvas>
  )
}


//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<AppMain />);
