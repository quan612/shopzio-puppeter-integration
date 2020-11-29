import React, { Component, useState } from "react";
import axios from "axios";
import productsList from "data/productsList.json";
import img1 from "data/FMMW424G8085Q.jpg";

import "./style.css";

const array = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
];

const Catalog = () => {
  console.log(productsList);
  return (
    <>
      {/* <div className="page"></div> */}
      <div className="max-w-print w-full m-auto mt-2 relative">
        <div className="page  flex sm:flex-row justify-center items-center print:flex-row flex-wrap h-full relative">
          {array.map((item, index) => {
            return (
              <div
                // className={
                //   "flex flex-col justify-center max-w-1/4 h-card relative m-1 mt-4 " +
                //   ((index + 1) % 12 === 0 ? "page" : "")
                // }

                className=" justify-center max-w-1/4 h-card relative "
              >
                {/* <div
                  // slot="bottom-left"
                  // className="max-w-xs"
                > */}
                <div className="h-auto p-1 shadow-md m-1 mt-4 relative">
                  <img
                    className=" object-scale-down h-30 block"
                    src={img1}
                    alt="step3"
                  />
                  <div className="text-xl font-bold mt-2 mb-2 text-center block">
                    FMMW424G
                  </div>
                  <div className="text-small text-gray-700 mt-2 mb-2 block">
                    CONCHO COLLECTION CONCEALED CARRY SATCHEL
                  </div>

                  {/* <- Price  -> */}
                  <div className="block mt-1 mb-1  block">
                    <div className="regular-price text-xs font-bold ">
                      Regular:
                    </div>
                    <div className="regular-price text-sm font-bold ">$21</div>
                  </div>

                  {/* <- Price  -> */}
                  <div className="block mt-1 mb-1  block">
                    <div className="regular-price text-xs font-bold text-red-400">
                      Show Special:
                    </div>
                    <div className="regular-price text-sm font-bold text-red-400">
                      $21
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Catalog;
