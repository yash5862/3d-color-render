import logo from './logo.svg';
import './App.css';
import Renderer3D from "./3d/renderer";
import { MaterialPicker as ColorPicker } from 'react-color';
import { useState } from 'react';
import CustomColorPicker from './components/picker.component';
import Modal from './3d/3d.modal';
import { Col, Row } from 'reactstrap';

function App() {

  const [color, setColor] = useState('#ffffff');

  const onColorChange = (color, event) => {
    setColor(color.hex);
  }

  return (
    <>
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
                <Renderer3D>
                  <Modal
                      path="/wheel.fbx"
                      scale={[0.030, 0.030, 0.030]}
                      position={[0, 0, 0]}
                      renderPriority={2}
                      color={color}
                  />
                </Renderer3D>
              </Col>

              <Col md={6}>
                <Renderer3D>
                  <Modal
                      path="/temp.obj"
                      scale={[0.50, 0.50, 0.50]}
                      position={[0, 0, 0]}
                      boundingBox={false}
                      renderPriority={2}
                      color={color}
                  />
                </Renderer3D>
              </Col>
            </Row>
            <Row>
              <Col>
                <Renderer3D>
                  <Modal
                      path="/tire2.gltf"
                      scale={[1, 1, 1]}
                      position={[0, 0, 0]}
                      boundingBox={false}
                      renderPriority={2}
                      color={color}
                  />
                </Renderer3D>
              </Col>
            </Row>
        </div>
          <CustomColorPicker
            color={ color }
            onChangeComplete={ onColorChange }
          />
        </Col>
      </Row>
      
    </>
  );
}

export default App;
