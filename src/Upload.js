import React, { useState, useRef } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import FileUpl from "./file.png";
import { Canvas } from "@react-three/fiber";
import Renderer3D from "./3d/renderer";
import { toast } from "react-toastify";
import { uploadElement } from "./api";

const Upload = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [imgBase, setImgBase] = useState(null);
  const canvasRef = useRef(null);
  const getFileExtension = (fileName) => {
    return fileName.split(".").pop();
  };

  const onDrop = (acceptedFiles) => {
    const extension = getFileExtension(acceptedFiles[0].path);
    if (extension == "gltf" || extension == "glb") {
      return setValue(acceptedFiles[0]);
    } else if (extension == "obj") {
      return setValue(acceptedFiles[0]);
    } else if (extension == "fbx") {
      return setValue(acceptedFiles[0]);
    } else {
      setValue(null);
      toast.error("Select Valid File");
    }
  };
  const {
    acceptedFiles,
    getRootProps,
    open,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    multiple: false,

    onDrop,
  });

  const pngHanlder = () => {
    const image = canvasRef?.current?.toDataURL("image/png");
    setImgBase(image);
  };

  const uploadHanlder = async () => {
    if (imgBase === null) {
      return toast.error("Take Pic");
    }
    const formData = new FormData();
    formData.append("object", value);
    formData.append("name", value?.path?.split(".")[0]);
    formData.append("image", imgBase);

    const Data = await uploadElement(formData);
    if (Data.status === 200) {
      toast.success(Data?.message);
      setValue(null)
    } else {
      toast.error(Data?.message);
    }
  };

  return (
    <>
      <Col md={12} className="shadow-sm p-3 mb-5 App-header ">
        <div className="container d-flex align-items-center justify-content-between">
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      </Col>

      <Row
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
        }}
      >
        {value && (
          <>
            <Row className="d-flex align-items-center justify-content-center flex-column">
              <div
                className="card col-6 rounded-3 shadow-sm p-0"
                style={{ height: "30vh", marginTop: "80px" }}
              >
                <Canvas
                  style={{ height: "100%", width: "100%" }}
                  ref={canvasRef}
                >
                  <Renderer3D
                    path={value.path}
                    scale={[1, 1, 1]}
                    position={[0, 0, 0]}
                    renderPriority={2}
                    color={"#D5D5D5"}
                  />
                </Canvas>
              </div>
              <div className="col-6 mt-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary mx-3"
                  onClick={() => {
                    pngHanlder();
                  }}
                >
                  Take Pic
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    uploadHanlder();
                  }}
                >
                  Upload
                </button>
              </div>
            </Row>
          </>
        )}
        <div className="card col-md-6 rounded-3 shadow-sm p-1 m-2 text-center">
          <div className="row">
            <div className="col-12 mb-3 mt-4">
              <img src={FileUpl} alt="FileUpload" />
            </div>
            <div
              className="col-12 mb-5"
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />

              <p className="robot-font regal-blue-color fw-bold fs-5">
                Drag and drop your file
              </p>

              {acceptedFiles.length <= 0 && (
                <p>
                  {!isDragActive && "gltf . Max 100mb."}
                  {isDragActive && !isDragReject && "Drop your Files Here"}
                  {isDragReject && "File type not accepted, sorry!"}
                </p>
              )}
            </div>
            {acceptedFiles.length > 0 && (
              <div className="col-12 mb-3">
                <div className="row justify-content-center">
                  {acceptedFiles.map((file) => {
                    return (
                      <div className="col-12  col-sm-4 p-2" key={file.name}>
                        {file.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="col-12 mb-3">
              <p className="robot-font font-cool-gray-color fw-normal fs-6">
                or choose a file
              </p>
            </div>
            <div className="col-12 mb-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={open}
              >
                Browse files
              </button>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default Upload;
