import React, { Component, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

import ShowCatalog from "./ShowCatalog";
import CanadianTire from "./CanadianTire";

const options = [
  { value: "catalog", label: "Show Catalog" },
  { value: "canadianTire", label: "CanadianTire" },
  { value: "summarization", label: "Summarization" },
];

const Catalog = () => {
  // const [showCatalog, setShowCatalog] = useState(false);
  // const [showCatalog, setShowCatalog] = useState(false);
  const [show, setShow] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState(options[0].value);
  const [items, setItems] = useState([]);
  const [currentState, setCurrentState] = useState({
    selectedFile: null,
  });

  const onSelect = (event) => {
    const file = event.target.files[0];
    setCurrentState({
      selectedFile: file,
    });
  };

  const onUpload = () => {
    const data = new FormData();
    data.append("file", currentState.selectedFile);

    axios
      .post("/api/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        const { data } = res;
        toast.success("upload success");
        setItems((prev) => {
          return [...prev, ...data];
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("upload fail");
      });
  };

  const onGenerateTemplate = () => {
    setShow(true);
  };

  console.log(selectTemplate);
  const onSelectTemplate = (selectOption) => {
    setSelectTemplate(selectOption.value);
    console.log(`Option selected:`, selectOption);
  };

  const onClear = () => {};

  return (
    <>
      <div className="max-w-print w-full m-auto mt-2 relative ">
        <div className="offset-md-3 col-md-6">
          <div className="form-group template-type">
            <label>Type of template</label>
            <Dropdown
              value={selectTemplate}
              onChange={onSelectTemplate}
              options={options}
            />
          </div>
          <div className="form-group files">
            <label>Upload Excel</label>
            <input
              id="fileInputId"
              type="file"
              className="form-control"
              onChange={onSelect}
            />
          </div>
          <div className="form-group mt-2">
            <ToastContainer />
            <button
              type="button"
              className="bg-blue-600 py-1 px-3 rounded text-white hover:opacity-80"
              onClick={onUpload}
            >
              Upload
            </button>
            <button
              type="button"
              className="bg-blue-600 py-1 px-3 rounded text-white hover:opacity-80 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onGenerateTemplate()}
              disabled={!items.length > 0}
            >
              Generate
            </button>
            <button
              type="button"
              className="bg-red-600 py-1 px-3 rounded text-white hover:opacity-80 ml-2"
              onClick={() => onClear()}
            >
              Clear Buffer
            </button>
          </div>
        </div>
        <div className=" page h-full relative">
          {show && selectTemplate === "catalog" && (
            <ShowCatalog items={items} />
          )}
          {show && selectTemplate === "canadianTire" && (
            <CanadianTire items={items} />
          )}
          {show && selectTemplate === "summarization" && (
            <ShowCatalog items={items} />
          )}
        </div>
      </div>
    </>
  );
};

export default Catalog;
