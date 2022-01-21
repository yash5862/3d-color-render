import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import FileUpl from "./file.png";

const Upload = () => {
  const navigate = useNavigate();
  const [fileTypes] = useState([
    "model/gltf+json",
    "model/gltf-binary",
    "application/octet-stream",
    "text/plain",
  ]);

  const typeValidator = (file) => {
    if (file.size > 10000000) {
      return alert("File Is To Big. Max Size is 100mb");
    }
    return null;
  };

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
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
