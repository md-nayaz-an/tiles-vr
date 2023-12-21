import { Container, Image, Text } from "@coconut-xr/koestlich";
import { Suspense, useContext, useState } from "react";
import imgSelectorContext from "../contexts";

function ImageCard(props) {
  const [hoverCount, setHoverCount] = useState(0);
  
  const imgContext = useContext(imgSelectorContext);

  return (
    <Container
      padding={8}
      flexDirection="column"
      onPointerEnter={() => setHoverCount((current) => current + 1)}
      onPointerLeave={() => setHoverCount((current) => current - 1)}
      backgroundColor="white"
      backgroundOpacity={hoverCount > 0 ? 0.1 : 0}
      borderRadius={8}
      width={"30%"}
      onClick={() => {
        imgContext.setImgSrc(props.src)
        console.log(props.src)
      }}
    >
      <Suspense>
        <Image url={"./assets/textures/" + props.src} fit="fill" width={"100%"}/>
        <Container marginTop={4}>
          <Text fontSize={16} color="white">
            {props.src}
          </Text>
          <Text fontSize={16} color="white" opacity={0.5}>
            {props.src}
          </Text>
        </Container>
      </Suspense>
    </Container>
  );
}

export default ImageCard;
