import React, { Component, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import ImportWrapper from "./ImportWrapper";

const ImportShopzio = () => {
  let timer = null;
  const [file, setCurrentFile] = useState({
    selectedFile: null,
  });
  const [orderId, setOrderId] = useState("");
  const [currentState, setState] = React.useState({
    removeBlankQty: false,
  });

  const [error, setError] = useState("");

  React.useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onSelectFile = (event) => {
    const uploadFile = event.target.files[0];
    setCurrentFile({
      selectedFile: uploadFile,
    });
  };

  const onUpload = () => {
    const data = new FormData();
    data.append("file", file.selectedFile);

    axios
      .post("http://localhost:8000/api/upload", data)
      .then((res) => {
        toast.success("upload success");
        res.data.forEach((item) => console.log(item["Order QTY"]));
        // console.log(res);
      })
      .catch((err) => {
        toast.error("upload fail");
      });
  };

  const onDispatch = () => {
    axios
      .post("http://localhost:8000/api/puppeteer", currentState)
      .then((res) => {
        toast.success("upload success");
        setOrderId(res.data.orderId);
      })
      .catch((err) => {
        toast.error("dispatch fail");
        if (err.response) setError(err.response.data);
      });
  };

  const onChangeCustomAttribute = (evt) => {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...currentState,
      [evt.target.name]: value,
    });
  };

  console.log(file);
  return (
    <ImportWrapper
      onSelectFile={onSelectFile}
      onUpload={onUpload}
      onDispatch={onDispatch}
      onChangeCustomAttribute={onChangeCustomAttribute}
      orderId={orderId}
      error={error}
    />
    // <div className="container">
    //   <div className="row">
    //     <div className="offset-md-3 col-md-6">
    //       <div className="form-group files">
    //         <label>Upload Your File </label>
    //         <input
    //           id="fileInputId"
    //           type="file"
    //           className="form-control"
    //           onChange={onSelect}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <ToastContainer />

    //         <button
    //           type="button"
    //           className="btn btn-success btn-block"
    //           onClick={onUpload}
    //         >
    //           Upload
    //         </button>

    //         <button
    //           type="button"
    //           className="btn btn-danger btn-block mt-2"
    //           onClick={onDispatch}
    //         >
    //           Dispatch
    //         </button>
    //         <Progress
    //           max="100"
    //           color="success"
    //           value={currentState.loaded}
    //           className="mt-4"
    //         >
    //           {Math.round(currentState.loaded, 2)}%
    //         </Progress>
    //       </div>
    //       <div>Order Id that imported: {orderId}</div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ImportShopzio;
