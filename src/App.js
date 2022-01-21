import "./App.css";
import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import Back from "./back.png";
import { useNavigate } from "react-router-dom";
import { getAllElementData } from "./api";
import { toast } from "react-toastify";

function App() {
  const [value, setValue] = useState([]);

  let navigate = useNavigate();

  useEffect(async () => {
    datahanlder();
  }, []);

  const datahanlder = async () => {
    const Data = await getAllElementData();
    if (Data.status === 200) {
      setValue(Data?.data?.objects);
      console.log("Datat", Data?.data?.objects);
    } else {
      toast.error(Data?.message);
    }
  };

  return (
    <>
      <div className="App ">
        <>
          <Col md={12} className="shadow-sm p-3 mb-5 App-header ">
            <div className="container d-flex align-items-center justify-content-between">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => {
                  navigate(`/upload`);
                }}
              >
                Upload element
              </button>
            </div>
          </Col>
          <Row className="d-flex justify-content-center p-5">
            {value &&
              value.map((val, index) => {
                return (
                  <div className="card col-md-5 rounded-3 shadow-sm p-0 m-2">
                    <img
                      src={Back}
                      alt="Back"
                      className="BackIcon shadow-sm"
                      onClick={() => {
                        navigate(`/${val?._id}`);
                      }}
                    />
                   
                    <img
                      src={val?.image}
                      alt="Img"
                      className="Card_Img_Box"
                    />
                  </div>
                );
              })}
          </Row>
        </>
      </div>
    </>
  );
}

export default App;
