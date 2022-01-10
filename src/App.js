import logo from './logo.svg';
import './App.css';
import Renderer3D from "./3d/renderer";
import { MaterialPicker as ColorPicker } from 'react-color';
import React, { useState } from 'react';
import CustomColorPicker from './components/picker.component';
import { Col, Row } from 'reactstrap';
import {Canvas} from "@react-three/fiber";

function App() {

  const [color, setColor] = useState('#ffffff');

  const onColorChange = (color, event) => {
    setColor(color.hex);
  }

  return (
    <>
      <div className='container'>
      <Row>
        <Col md={12}>
          <CustomColorPicker
            color={ color }
            onChangeComplete={ onColorChange }
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div className="App" style={{ height: '100vh', width: '100vh' }}>
            <Row>
              <Col md={6}>
                <Canvas style={{ height: '100%', width: '100%' }}>
                  <Renderer3D
                      path="/wheel.fbx"
                      scale={[1,1,1]}
                      position={[0, 0, 0]}
                      renderPriority={2}
                      color={color}
                  />
                </Canvas>
              </Col>

              <Col md={6}>
                <Canvas style={{ height: '100%', width: '100%' }}>
                  <Renderer3D
                      path="/temp.obj"
                      scale={[1,1,1]}
                      position={[0, 0, 0]}
                      boundingBox={false}
                      renderPriority={2}
                      color={color}
                  />
                </Canvas>
              </Col>

              <Col md={6}>
                <Canvas style={{ height: '100%', width: '100%' }}>
                  <Renderer3D
                      path="/tire2.gltf"
                      scale={[1, 1, 1]}
                      position={[0, 0, 0]}
                      boundingBox={false}
                      renderPriority={2}
                      color={color}
                  />
                </Canvas>
              </Col>
            </Row>
        </div>
        </Col>
      </Row>
      </div>
    </>
  );
}

export default App;
