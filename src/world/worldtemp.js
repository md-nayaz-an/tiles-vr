import {
  Controllers,
  Grabbable,
  Hands,
  XRCanvas,
} from "@coconut-xr/natuerlich/defaults";
import {
  RootContainer,
  Image,
  Text,
  Container,
  DefaultStyleProvider,
  clippingEvents,
} from "@coconut-xr/koestlich";
import { Suspense, useState } from "react";
import {
  ImmersiveSessionOrigin,
  NonImmersiveCamera,
  useEnterXR,
} from "@coconut-xr/natuerlich/react";
import { Glass, IconButton } from "@coconut-xr/apfel-kruemel";
import { FastForward, Play, Rewind } from "@coconut-xr/lucide-koestlich";
import { Center } from "@react-three/drei";
import { Room } from "./plane";
import ImmersiveSession from "../ui/immersiveSession";

const cssStyle = {
  touchAction: "none",
  overscrollBehavior: "none",
  userSelect: "none",
  position: "absolute",
  inset: 0,
};

const sessionOptions = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

export default function World() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const enterVR = useEnterXR("immersive-vr", sessionOptions);

  
  const [scale, setScale] = useState(0.0275);

  const [session, setSession] = useState(false);
  return (
    <>
      <XRCanvas 
        style={cssStyle}
        events={clippingEvents} 
        gl={{ localClippingEnabled: true }}
      >
        <ambientLight color={"#f1f1f1"} />
        <color args={["#eee"]} attach="background" />
        <NonImmersiveCamera position={[0, 1.5, -0.1]} />
        
        <ImmersiveSession />

        <Suspense>
          <Center disableY={true}>
            <mesh scale={scale} visible={true}>
              <Room
                session={session}
                scale={scale}
                setScale={setScale}
              />
            </mesh>
          </Center>
        </Suspense>
      </XRCanvas>
      <button
        style={{
          padding: "1rem",
          position: "absolute",
          bottom: "5rem",
          right: "1rem",
        }}
        onClick={enterVR}
      >
        VR
      </button>
    </>
  );
}
