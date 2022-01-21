import React, { Suspense } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your route components too
import App from "./App";
import Upload from "./Upload";
import SingleItem from "./SingleItem";

render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading... </div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/:id" element={<SingleItem />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
