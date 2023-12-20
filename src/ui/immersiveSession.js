import { getInputSourceId } from "@coconut-xr/natuerlich";
import { PointerController, PointerHand, TouchHand } from "@coconut-xr/natuerlich/defaults";
import { ImmersiveSessionOrigin, useInputSources } from "@coconut-xr/natuerlich/react";
import { useEffect } from "react";
import MainUI from "./ui";


function ImmersiveSession() {
  const inputSources = useInputSources();
  console.log(inputSources);
  
  useEffect(() => {
    console.log(inputSources);
  
  }, [inputSources])
  
  return (
    <ImmersiveSessionOrigin>
      {inputSources.map((inputSource) =>
        inputSource.hand != null ? (
          <PointerHand
                id={getInputSourceId(inputSource)}
                key={getInputSourceId(inputSource)}
                inputSource={inputSource}
                hand={inputSource.hand}
                childrenAtJoint="wrist"
              >
                <MainUI />
              </PointerHand>
            ) : (
              <PointerController
                id={getInputSourceId(inputSource)}
                key={getInputSourceId(inputSource)}
                inputSource={inputSource}
              >
                <MainUI />
              </PointerController>
        ),
      )}
    </ImmersiveSessionOrigin>
  );
}

export default ImmersiveSession;
