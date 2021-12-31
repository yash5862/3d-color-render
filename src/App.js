import logo from './logo.svg';
import './App.css';
import Renderer3D from "./3d/renderer";
import { MaterialPicker as ColorPicker } from 'react-color';
import { useState } from 'react';
import CustomColorPicker from './components/picker.component';
import Modal from './3d/3d.modal';

function App() {

  const [color, setColor] = useState('#ffffff');

  const onColorChange = (color, event) => {
    setColor(color.hex);
  }

  return (
    <>
      <CustomColorPicker
        color={ color }
        onChangeComplete={ onColorChange }
      />
      <div className="App" style={{ height: '100vh', width: '100vh' }}>
        <Renderer3D>
          <Modal
              path="/model.glb"
              scale={[0.03, 0.03, 0.03]}
              position={[0, 0, 0]}
              boundingBox={false}
              renderPriority={2}
              color={color}
          />
        </Renderer3D>

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
      </div>
    </>
  );
}

export default App;
