import React from 'react';
import ReactDOM from 'react-dom/client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

import { World } from './world/world.js';
import { Utils } from './utility/utilMain.js';

const IconAnimated = animated(Icon);
const ColAnimated = animated(Col);

function AppMain() {

  const [expanded, toggle] = useState(true);

  const animateUtils = useSpring({
    left: expanded ? "75%" : "97%"
  });

  const animateCanvas = useSpring({
    right: expanded ? "25%" : "3%"
  })
  
  const canvasStyle = {
    boxSizing: "border-box",
    position: "absolute",
    left: "0%",
    right: "25%",
    top: "0px",
    bottom: "0px",
    background: "#FFFFFF",
    border: "2px solid #A4A4A4",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "22px",
    zIndex: 1,
    ...animateCanvas
  }

  const utilFrameStyle = {
    position: "absolute",
    left: "75%",
    right: "0%",
    top: "0px",
    bottom: "0px",
    ...animateUtils
  }

  return(
    <React.StrictMode>

    <Row>
      <ColAnimated style={canvasStyle}>
              
        <World />
      
      </ColAnimated>
      <ColAnimated style={utilFrameStyle}>
        <UtilFrame 
          expanded={expanded}
          toggle={toggle}
        />
      </ColAnimated>
  
    </Row>
    
    </React.StrictMode>
  )
}

function UtilFrame(props) {
  
  const utilsStyle = {
    boxSizing: "border-box",
    position: "absolute",
    inset: "0px 0px 0px 0px",
    background: "#D9D9D9",
    border: "1px solid #A4A4A4",
    borderRadius: "24px 0px 0px 24px",
    zIndex: 2
  }
  
  const vectorAnimation = useSpring({
    transform: props.expanded ? "rotate(-180deg)" : "rotate(0deg)"
  })
  return(
  
    <Container style={utilsStyle}>
      
      <div
        onClick={() => {props.toggle(!props.expanded)}}
        style={{
        position:'absolute',
        width: "50px",
        height: "50px",
        left: "-25px",
        top: "50%",
        background: "#FFFFFF",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "50px",
        zIndex: 4,
      }}>
    
        <IconAnimated icon="eva:arrow-ios-back-outline"
          style={{
            position: "absolute",
            fontSize: "30px",
            left: "calc(50% - 30px/2",
            top: "calc(50% - 30px/2)",
            transform: "rotate(180deg)",
            ...vectorAnimation
          }}
        />
    
      </div>
      <Utils />
    </Container>
  )
}


//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<AppMain />);
