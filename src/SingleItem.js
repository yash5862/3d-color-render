import React, { useState, useEffect } from "react";
import CustomColorPicker from "./components/picker.component";
import { Col, Row } from "reactstrap";
import { Canvas } from "@react-three/fiber";
import Renderer3D from "./3d/renderer";
import { useNavigate, useParams } from "react-router-dom";
import { getElementData } from "./api";

const SingleItem = () => {
  const [subColor, setSubColor] = useState("#D5D5D5");
  const [value, setValue] = useState(null);

  const params = useParams();
  const onSubColorChange = (color, event) => {
    setSubColor(color.hex);
  };
  const navigate = useNavigate();

  useEffect(async () => {
    datahanlder();
  }, []);

  const datahanlder = async () => {
    const Data = await getElementData(params.id);
    if (Data.status === 200) {
      setValue(Data?.data?.objects);
    } else {
      alert(Data?.message);
    }
  };
  return (
    <>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
        }}
      >
        <Col md={12} className="shadow-sm p-3 mb-5 App-header ">
          <div className="container d-flex align-items-center justify-content-between">
            <div>
              <button
                type="button"
                className="btn btn-outline-light mx-2"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
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
          <Canvas style={{ height: "100%", width: "100%" }}>
            <Renderer3D
              path={"/tire2.gltf"}
              scale={[1, 1, 1]}
              position={[0, 0, 0]}
              renderPriority={2}
              color={subColor}
            />
          </Canvas>
        </div>
      </Row>
    </>
  );
};

export default SingleItem;
