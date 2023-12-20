import React, { Suspense } from 'react'
import { Container, FontFamilyProvider, RootContainer } from "@coconut-xr/koestlich";
import Glass from './glass';
import { useThree } from '@react-three/fiber';
import ImageGrid from './imageGrid';
import { Interactive } from '@react-three/xr';
const MainUI = () => {
    const aspectRatio = useThree(({ size }) => size.width / size.height);
    return (
        <group
            scale={Math.min(1, aspectRatio * 0.7) / 1200}
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
                    flexDirection="row"
                >
                    <Glass
                        width="100%"
                        height="100%"
                        borderRadius={32}
                        borderLeft={0}
                    >
                        <ImageGrid />
                    </Glass>
                </RootContainer>
                </Suspense>
            </FontFamilyProvider>
        </group>
    )
}

export default MainUI