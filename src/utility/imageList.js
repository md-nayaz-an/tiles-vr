import React, { useContext } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import imgSelectorContext from '../contexts';

export default function TitlebarImageList() {
  const imgContext = useContext(imgSelectorContext);

  return (
    <ImageList sx={{ width: '100%' }} >
      {itemData.map((item) => (
        <ImageListItem 
          key={item} cols={2} 
          sx={{ width: '80%',left: '10%', border: '2px solid rgba(178,178,178,1)'}}
          onClick={()=>imgContext.setImgSrc(item)}
        >
          <img
            src={`./assets/textures/${item}`}
            srcSet={`./assets/textures/${item}`}
            alt={item}
            loading="lazy"
          />
          <ImageListItemBar
            title={item}
            subtitle={item}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

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
