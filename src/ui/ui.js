import React, { Suspense, useContext, useRef } from 'react'
import { Container, FontFamilyProvider, RootContainer, Text } from "@coconut-xr/koestlich";
import Glass from './glass';
import { useThree } from '@react-three/fiber';
import ImageGrid from './imageGrid';
import { isXIntersection } from "@coconut-xr/xinteraction";
import imgSelectorContext from '../contexts';

const MainUI = ({ setDraggable }) => {
    const aspectRatio = useThree(({ size }) => size.width / size.height);
    
    const imgContext = useContext(imgSelectorContext);

    const ref = useRef(null);
    const downState = useRef();
    return (
        <group
            scale={Math.min(1, aspectRatio * 0.7) / 1200}
            position={[0, 1.5, -0.5]}
            ref={ref}
            >
            <FontFamilyProvider
                fontFamilies={{
                medium: ["https://coconut-xr.github.io/msdf-fonts/", "inter.json"],
                bold: ["https://coconut-xr.github.io/msdf-fonts/", "inter-bold.json"]
                }}
                defaultFontFamily="medium"
            >
                <Suspense>
                <RootContainer
                    anchorX="center"
                    anchorY="center"
                    sizeX={1024}
                    sizeY={796}
                    pixelSize={1}
                    flexDirection="column"
                    alignItems='center'
                    gapRow={10}
                    //rotation={[-Math.PI/3,0,0]}
                    position={[0,0,-600]}
                >
                    <Glass
                        width="100%"
                        height="90%"
                        borderRadius={32}
                        
                        onPointerEnter={() => setDraggable(false)}
                    >
                        <Container paddingX={8} paddingY={8}>
                            <Suspense>
                            <Text fontSize={26} color="white" fontFamily="bold">
                                Choose a Tile
                            </Text>
                            <Text fontSize={14} color="white" opacity={0.6}>
                                Current "{imgContext.imgSrc}"
                            </Text>
                            </Suspense>
                        </Container>
                        <ImageGrid />
                    </Glass>

                    <Container
                        width="40%"
                        onPointerDown={(e) => {
                            if (
                            ref.current != null &&
                            downState.current == null &&
                            isXIntersection(e)
                            ) {
                            e.stopPropagation();
                            (e.target).setPointerCapture(e.pointerId);
                            downState.current = {
                                pointerId: e.pointerId,
                                pointToObjectOffset: ref.current.position
                                .clone()
                                .sub(e.point),
                            };
                            }
                        }}
                        onPointerUp={(e) => {
                            if (downState.current?.pointerId != e.pointerId) {
                            return;
                            }
                            downState.current = undefined;
                        }}
                        onPointerMove={(e) => {
                            if (
                            ref.current == null ||
                            downState.current == null ||
                            e.pointerId != downState.current.pointerId ||
                            !isXIntersection(e)
                            ) {
                            return;
                            }
                            ref.current.position
                            .copy(downState.current.pointToObjectOffset)
                            .add(e.point);
                        }}
                        padding={20}
                        >
                        <Container
                            borderRadius={5}
                            padding={5}
                            marginX="auto"
                            width="80%"
                            backgroundOpacity={0.5}
                            backgroundColor="white"
                        />
                        </Container>
                </RootContainer>
                </Suspense>
            </FontFamilyProvider>
        </group>
    )
}

export default MainUI