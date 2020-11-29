import React, { Component, useState } from "react";
import axios from "axios";
import productsList from "data/productsList.json";
import img1 from "data/FMMW424G8085Q.jpg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";

const array = [1, 2];

const Catalog = () => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [items, setItems] = useState([]);
  const [currentState, setCurrentState] = useState({
    selectedFile: null,
  });

  const onSelect = (event) => {
    // document.getElementById("fileInputId").value = null;
    const file = event.target.files[0];
    setCurrentState({
      selectedFile: file,
    });
  };

  const onUpload = () => {
    const data = new FormData();
    data.append("file", currentState.selectedFile);

    axios
      .post("http://localhost:8000/api/upload", data)
      .then((res) => {
        const { data } = res;
        toast.success("upload success");
        // console.log(data);
        setItems((prev) => {
          return [...prev, ...data];
        });
      })
      .catch((err) => {
        toast.error("upload fail");
      });
  };

  console.log(items);

  const onClear = () => {};

  return (
    <>
      <div className="max-w-print w-full m-auto mt-2 relative ">
        <div className="offset-md-3 col-md-6">
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
              onClick={() => setShowCatalog(true)}
              disabled={!items.length > 0}
            >
              Generate Catalog
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
        <div className=" page  h-full relative">
          {showCatalog &&
            items &&
            items.map((item, index) => {
              return (
                <div
                  className="inline-block justify-center max-w-1/4 h-card relative shadow-md mb-6 ml-0.5 pl-1 pr-1"
                  key={item["Part No"]}
                >
                  <div className="flex flex-col h-full">
                    <img
                      className=" object-scale-down h-30 block"
                      src={item["ImagePath"]}
                      alt="step3"
                    />
                    <div className="text-lg font-base mt-2  text-center block">
                      {item["Part No"]}
                    </div>
                    <div className="text-small text-gray-700 mt-2 block">
                      {item["Description"]}
                    </div>

                    {/* Bottom */}
                    <div className="flex flex-1 flex-col justify-end">
                      {/* Conditional render for P1 and P3 or just P1 */}
                      {item["Sell 03"] !== 0 ? (
                        <>
                          <div className="flex justify-between mt-0.5 ">
                            <>
                              <div className="special text-xs font-bold text-red-400">
                                Show Special:
                              </div>
                              <div className="special text-xs font-bold text-red-400">
                                ${item["Sell 01"]}
                              </div>
                            </>
                          </div>
                          <div className="flex justify-between mt-0.5 ">
                            <div className="regular-price text-xs font-bold ">
                              Regular:
                            </div>
                            <div className="regular-price text-xs font-bold ">
                              ${item["Sell 03"]}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between mt-0.5 ">
                          <div className="regular-price text-xs font-bold ">
                            Regular:
                          </div>
                          <div className="regular-price text-xs font-bold ">
                            ${item["Sell 01"]}
                          </div>
                        </div>
                      )}

                      {/* Dimension */}
                      <div className="flex justify-between mt-0.5 ">
                        <div className=" text-xs  ">
                          H:{item["Height (UDF)"]}
                        </div>
                        <div className=" text-xs  ">
                          L:{item["Length (UDF)"]}
                        </div>
                        <div className=" text-xs  ">
                          W:{item["Width (UDF)"]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Catalog;
