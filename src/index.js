import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'

import { World } from './world/world.js';
import { Utils } from './utility/utilMain.js';

import './stylesheets/main.css';

import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';

import imgSelectorContext from './contexts';

function Main() {

  const [drawerOpen, setOpen] = useState({ bool: true, val: 'open'});

  const [imgSrc, setImgSrc] = useState('M_03_ceramic_2.jpg');

  return(
    <Box className='box container'>
      <Box className={'box main main-' + drawerOpen.val}>
        <Box className='title'>
        <div style={{
          position: 'absolute',
          top: '5%',
        }}>
          <img
            src='web-tiles.png'
            style={{width:'70%'}}
          />
        </div>
          <ChevronLeftRounded 
            style={{
                    position: 'absolute',
                    float: 'right',
                    top: '25%',
                    right: '0%'
                  }}   
            onClick={() => setOpen({bool: true, val: 'open'})}
          />          
        </Box>
        <Divider />
        <imgSelectorContext.Provider value={{imgSrc, setImgSrc}}>
          <World className='world' />
        </imgSelectorContext.Provider>
      </Box>
      <Box className={'box drawer drawer-' + drawerOpen.val}>
        <Box 
            className='drawerheader'
            style={{
                minHeight: '9vh',
                position: 'relative'
                }}>
                <ChevronRightRounded style={{
                  position: 'absolute',
                  top:'25%',
                  left:'0%'
                  }} 
                  onClick={() => setOpen({bool: false, val: 'close'})}
                />
        </Box>
        <Divider />
        <imgSelectorContext.Provider value={{imgSrc, setImgSrc}}>
          <Utils />
        </imgSelectorContext.Provider>
      </Box>
    </Box>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);