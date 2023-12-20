import { Container, noAnimation } from "@coconut-xr/koestlich";
import ImageCard from "./imageCard";

const itemData = [
    'Blonde-Sandstone-Architextures.jpg',
    'Calacatta-Vena-Architextures.jpg',
    'Travertine-Architextures.jpg',
  
    'Granite-Architextures.jpg',
    'Green-Marble-Architextures.jpg',
    //'grungy-gray-marble-textured-background.jpg',
    
    'M_02_ceramic_3.jpg',
    'M_03_ceramic_1.jpg',
    'M_03_ceramic_2.jpg',
    
    'M_03_go_cua.jpg',
    'M_05_inox2.png',
    'Polished-Concrete-Architextures.jpg'
];

function ImageGrid() {
    return (
            <Container
                height="100%"
                width="100%"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                overflow="scroll"
                gapRow={8}
                gapColumn={8}
                justifyContent="center"
            >
                {itemData.map((imageSrc, index) => (
                    <ImageCard key={index} src={imageSrc} />
                ))}
            </Container>
  );
}

export default ImageGrid;
