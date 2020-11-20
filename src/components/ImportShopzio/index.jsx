import React, { Component, useState } from "react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportShopzio = () => {
  const [currentState, setCurrentState] = useState({ selectedFile: null, loaded: 0 });

  const onSelect = (event) => {
    const file = event.target.files[0];
    setCurrentState({
      selectedFile: file,
      loaded: 0,
    });
  };

  const onUpload = () => {
    const data = new FormData();
    data.append("file", currentState.selectedFile);

    axios
      .post("http://localhost:8000/api/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          setCurrentState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        toast.success("upload success");
        console.log(res);
      })
      .catch((err) => {
        toast.error("upload fail");
      });
  };

  const onDispatch = () => {
    axios
      .post("http://localhost:8000/api/puppeteer", "123", {
        onUploadProgress: (ProgressEvent) => {
          setCurrentState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        toast.success("upload success");
        console.log(res);
      })
      .catch((err) => {
        toast.error("upload fail");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <div className="form-group files">
            <label>Upload Your File </label>
            <input type="file" className="form-control" onChange={onSelect} />
          </div>
          <div className="form-group">
            <ToastContainer />

            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={onUpload}
            >
              Upload
            </button>

            <button
              type="button"
              className="btn btn-danger btn-block mt-2"
              onClick={onDispatch}
            >
              Dispatch
            </button>
            <Progress
              max="100"
              color="success"
              value={currentState.loaded}
              className="mt-4"
            >
              {Math.round(currentState.loaded, 2)}%
            </Progress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportShopzio;
