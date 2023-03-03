import { useRef, useState, useEffect } from "react";
import { Interactive } from "@react-three/xr";
import { Texture, TextureLoader, RepeatWrapping, MeshStandardMaterial } from "three";
import { useLoader } from "@react-three/fiber";

const itemData = [
  'Blonde-Sandstone-Architextures.jpg',
  'Calacatta-Vena-Architextures.jpg',
  'Travertine-Architextures.jpg',

  'Granite-Architextures.jpg',
  'Green-Marble-Architextures.jpg',
  'grungy-gray-marble-textured-background.jpg',
  
  'M_02_ceramic_3.jpg',
  'M_03_ceramic_1.jpg',
  'M_03_ceramic_2.jpg',
  
  'M_03_go_cua.jpg',
  'M_05_inox2.png',
  'Polished-Concrete-Architextures.jpg'
];

export default function LoadTilePrimitive(props) {
  const [Hover, setHover] = useState(false)
  const [texture, setTexture] = useState(props.texture)
  const [imgCurrent, setCurrent] = useState(props.imgContext.imgSrc)

  var loader = new TextureLoader();

  const onSelect = () => {
    console.log(imgCurrent)
    let loc = itemData.indexOf(imgCurrent);
    console.log(loc)
    if((loc+1) % 3 === 0)
      loc -= 3
    loc += 1
    console.log(loc)

    setCurrent(itemData[loc])
    console.log(imgCurrent)
    const newTexture = loader.load(`./assets/textures/${itemData[loc]}`)
    newTexture.flipY = false;
    newTexture.wrapS = RepeatWrapping;
    newTexture.wrapT = RepeatWrapping;
    //console.log(texture)
    setTexture(newTexture)
  }

  useEffect(() => {
    setTexture(props.texture)
    return
  }, [props.texture])


  useEffect(() => {
    setCurrent(props.imgContext.imgSrc)
    return
  }, [props.imgContext])

  return(
    <Interactive
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
      onSelectStart={onSelect}
    >
      <mesh
        geometry={props.node.geometry}
        //visible={!Hover}
        //scale={props.scale}
        onClick={onSelect}
      >
        <meshStandardMaterial map={texture} />
      </mesh>
    </Interactive>
  )
}