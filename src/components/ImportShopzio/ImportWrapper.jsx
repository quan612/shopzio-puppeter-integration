import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportWrapper = ({
  onSelectFile,
  onUpload,
  onDispatch,
  onChangeCustomAttribute,
  orderId,
  error,
}) => {
  console.log(error);
  return (
    <div className="container">
      <div className="row mt-2">
        <ToastContainer />
        <div className="offset-md-3 col-md-6">
          <div className="form-group files">
            <label htmlFor="fileInput" className="bg-green-500 p-2 rounded">
              Select File
            </label>
            <input
              id="fileInput"
              type="file"
              className="form-control hidden"
              onChange={onSelectFile}
            />
            <button
              type="button"
              className="bg-blue-600 py-1 px-3 rounded text-white hover:opacity-80 ml-4"
              onClick={onUpload}
            >
              Upload
            </button>

            <button
              type="button"
              className="bg-blue-600 py-1 px-3 rounded text-white hover:opacity-80 ml-4"
              onClick={onDispatch}
            >
              Dispatch
            </button>
          </div>
          <div className="form-group options selected">
            <input
              id="removeCustomerPrice"
              name="removeBlankQty"
              type="checkbox"
              className="form-control"
              onChange={onChangeCustomAttribute}
            />
            <label htmlFor="removeCustomerPrice" className="p-2 ">
              Do not import items without qty
            </label>
          </div>
          <div>Order Id that imported: {orderId}</div>
          {error && (
            <label className="text-red-400">Error happens at: {error}</label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportWrapper;
