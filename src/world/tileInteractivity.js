import { useRef, useState } from "react";
import { Interactive } from "@react-three/xr";
import { Texture, TextureLoader, RepeatWrapping, MeshStandardMaterial } from "three";
import { useLoader } from "@react-three/fiber";

export default function LoadTilePrimitive(props) {
  const ref = useRef();
  console.log(ref.current)
  
  //console.log(material)
  const [Hover, setHover] = useState(false)
  const [material, setMaterial] = useState(props.material.clone())
  
  var loader = new TextureLoader();

  const onSelect = () => {
    const texture = loader.load(`./assets/textures/Green-Marble-Architextures.jpg`)
    texture.flipY = false;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    console.log(texture)

    Object.assign(material, {
      map: texture
    })
  }

  return(
    <Interactive
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
      onSelectStart={onSelect}
    >
      <mesh
        ref={ref}
        rotation-x={Math.PI / 2}
        geometry={props.node.geometry}
        //visible={!Hover}
        material={material}  
        //onClick={(e) => console.log(e.object.name)}
      />
    </Interactive>
  )
}