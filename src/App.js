import "./App.css";
import Renderer3D from "./3d/renderer";
import React, { useState, useEffect } from "react";
import CustomColorPicker from "./components/picker.component";
import { Col, Row } from "reactstrap";
import { Canvas } from "@react-three/fiber";
import Back from "./back.png";
import { useNavigate } from "react-router-dom";
import { getAllElementData } from "./api";
function App() {
  const [value, setValue] = useState([]);
  const [color, setColor] = useState("#D5D5D5");

  let navigate = useNavigate();

  const onColorChange = (color, event) => {
    setColor(color.hex);
  };

  useEffect(async () => {
    datahanlder();
  }, []);

  const datahanlder = async () => {
    const Data = await getAllElementData();
    if (Data.status === 200) {
      setValue(Data?.data?.objects);
    } else {
      alert(Data?.message);
    }
  };

  return (
    <>
      <div className="App ">
        <>
          <Col md={12} className="shadow-sm p-3 mb-5 App-header ">
            <div className="container d-flex align-items-center justify-content-between">
              <CustomColorPicker
                color={color}
                onChangeComplete={onColorChange}
              />
              <button
                type="button"
                class="btn btn-outline-light"
                onClick={() => {
                  navigate(`/upload`);
                }}
              >
                Upload element
              </button>
            </div>
          </Col>
          <Row className="d-flex justify-content-center p-5">
            <div className="card col-md-5 rounded-3 shadow-sm p-0 m-2">
              <img
                src={Back}
                alt="Back"
                className="BackIcon shadow-sm"
                onClick={() => {
                  // fullViewDataHanler("/wheel.fbx");
                  navigate(`/1`);
                }}
              />

              <Canvas style={{ height: "100%", width: "100%" }}>
                <Renderer3D
                  path="/wheel.fbx"
                  scale={[1, 1, 1]}
                  position={[0, 0, 0]}
                  renderPriority={2}
                  color={color}
                />
              </Canvas>
            </div>

            <div className="card col-md-5 rounded shadow-sm p-0 m-2">
              <img
                src={Back}
                alt="Back"
                className="BackIcon shadow-sm"
                onClick={() => {
                  // fullViewDataHanler("/temp.obj");
                  navigate(`/1`);
                }}
              />
              <Canvas style={{ height: "100%", width: "100%" }}>
                <Renderer3D
                  path="/temp.obj"
                  scale={[1, 1, 1]}
                  position={[0, 0, 0]}
                  boundingBox={false}
                  renderPriority={2}
                  color={color}
                />
              </Canvas>
            </div>

            <div className="card col-md-5 rounded  shadow-sm p-0 m-2">
              <img
                src={Back}
                alt="Back"
                className="BackIcon shadow-sm"
                onClick={() => {
                  navigate(`/61e954554a1d8a1c98472209`);
                }}
              />
              
              <Canvas style={{ height: "100%", width: "100%" }}>
                <Renderer3D
                  path="/tire2.gltf"
                  scale={[1, 1, 1]}
                  position={[0, 0, 0]}
                  boundingBox={false}
                  renderPriority={2}
                  color={color}
                />
              </Canvas>
            </div>
          </Row>
        </>
      </div>
    </>
  );
}

export default App;
