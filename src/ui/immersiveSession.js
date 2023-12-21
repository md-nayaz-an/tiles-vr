import { getInputSourceId } from "@coconut-xr/natuerlich";
import { GrabController, GrabHand, Grabbable, PointerController, PointerHand, TouchHand } from "@coconut-xr/natuerlich/defaults";
import { ImmersiveSessionOrigin, useInputSources, useXRGamepadReader } from "@coconut-xr/natuerlich/react";
import { useEffect, useRef, useState } from "react";
import MainUI from "./ui";
import { useFrame } from "@react-three/fiber";


function ImmersiveSession() {
  const inputSources = useInputSources();

  const left = inputSources.find((s) => s.handedness === "left");
  const right = inputSources.find((s) => s.handedness === "right");
  
  const [draggable, setDraggable] = useState(false);

  const grabRef = useRef();

  useEffect(() => {
    console.log(draggable);
  
  }, [draggable])
  
  return (
    <>
    <ImmersiveSessionOrigin>
      
    {inputSources.map((inputSource) =>
            inputSource.hand != null ? (
              inputSource.handedness === "left" ? (
                <GrabHand
                  id={getInputSourceId(inputSource)}
                  key={getInputSourceId(inputSource)}
                  inputSource={inputSource}
                  hand={inputSource.hand}
                />
              ) : (
                <PointerHand
                  id={getInputSourceId(inputSource)}
                  key={getInputSourceId(inputSource)}
                  inputSource={inputSource}
                  hand={inputSource.hand}
                >

                </PointerHand>
              )
            ) : inputSource.handedness === "left" ? (
              <GrabController
                id={getInputSourceId(inputSource)}
                key={getInputSourceId(inputSource)}
                inputSource={inputSource}
              />
            ) : (
              <PointerController
                id={getInputSourceId(inputSource)}
                key={getInputSourceId(inputSource)}
                inputSource={inputSource}
              >
                
              </PointerController>
            )
          )}
      </ImmersiveSessionOrigin>
      <MainUI setDraggable={setDraggable} />
      </>
  );
}

function GamePad (props) {
  const reader = useXRGamepadReader(props.inputSource);

  useFrame(() => {
    if(reader.readButtonValue(props.button) === 1 && 
      reader.readButtonValue(props.button) !== props.clicked
    )
      props.setClicked(prev => !prev)
    
  })

  return(<>
  </>)
}

export default ImmersiveSession;
