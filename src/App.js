import logo from "./logo.svg";
import "./App.css";
import Renderer3D from "./3d/renderer";
import React, { useState } from "react";
import CustomColorPicker from "./components/picker.component";
import { Col, Row } from "reactstrap";
import { Canvas } from "@react-three/fiber";
import Back from "./back.png";
import TwoD from "./twod.png";

function App() {
  const [color, setColor] = useState("#D5D5D5");
  const [subColor, setSubColor] = useState("#D5D5D5");
  const [fullView, setfullView] = useState(true);
  const [modelData, setmodelData] = useState("/wheel.fbx");

  const onColorChange = (color, event) => {
    setColor(color.hex);
  };

  const onSubColorChange = (color, event) => {
    setSubColor(color.hex);
  };
  const fullViewDataHanler = (data) => {
    setmodelData(data);
    setfullView(!fullView);
  };

  const closeHandler = () => {
    setfullView(!fullView);
    setSubColor("#D5D5D5")
  };

  return (
    <>
      <div className="App ">
        {fullView ? (
          <>
            <Col md={12} className="shadow-sm p-3 mb-5 App-header ">
              <div className="container">
                <CustomColorPicker
                  color={color}
                  onChangeComplete={onColorChange}
                />
              </div>
            </Col>
            <Row className="d-flex justify-content-center p-5">
              <div className="card col-md-5 rounded-3 shadow-sm p-0 m-2">
                <img
                  src={Back}
                  alt="Back"
                  className="BackIcon shadow-sm"
                  onClick={() => {
                    fullViewDataHanler("/wheel.fbx");
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
                    fullViewDataHanler("/temp.obj");
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
                    fullViewDataHanler("/tire2.gltf");
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
        ) : (
          <>
            <Row className="d-flex justify-content-center">
              <Col md={12} className="shadow-sm p-3 mb-5 App-header ">
                <div className="container">
                  <CustomColorPicker
                    color={subColor}
                    onChangeComplete={onSubColorChange}
                  />
                </div>
              </Col>
              <div
                className="card col-10 rounded-3 shadow-sm p-0"
                style={{ height: "80vh", marginTop: "50px" }}
              >
                <img
                  src={Back}
                  alt="Back"
                  className="BackIcon shadow-sm"
                  onClick={closeHandler}
                  style={{
                    transform: "rotate(180deg)",
                  }}
                />
                {/* <img
                        src={TwoD}
                        alt="Back"
                        className="TwoDIcon shadow-sm"
                        onClick={() => {
                          setfullView(!fullView);
                        }}
                        style={{
                          transform: "rotate(180deg)"
                        }}
                      /> */}
                <Canvas style={{ height: "100%", width: "100%" }}>
                  <Renderer3D
                    path={modelData}
                    scale={[1, 1, 1]}
                    position={[0, 0, 0]}
                    renderPriority={2}
                    color={subColor}
                  />
                </Canvas>
              </div>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default App;
