import React from "react";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const CanadianTire = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        // const imagePath = item["ImagePath"];
        // const correctPath = imagePath.replace("Z:", "http://127.0.0.1:8080");

        return (
          <div
            className="inline-block justify-center max-w-1/4 min-w-1/4 h-card relative mb-6 ml-0.5 pl-1 pr-1"
            key={item["Part No"]}
          >
            <div className="flex flex-col h-full">
              <img
                className=" object-scale-down h-30 block"
                // src={correctPath}
                src="https://via.placeholder.com/150"
                alt="step3"
              />
              <div className="text-sm font-base mt-2 text-center block part-number">
                {item["Part No"]}
              </div>

              {/* Price */}
              <div className="flex flex-col text-center">
                <div className="text-center mt-0.5 ">
                  <div className="text-base font-bold ">${item["Sell 01"]}</div>
                </div>
              </div>
              <div className="text-small text-gray-700 mt-2 block text-center">
                {item["Description"]}
              </div>

              {/* Canadian Tire Number */}
              <div className="text-base text-gray-700 mt-2 block text-center">
                CDN:{item["Canadian Tire Part Number (UDF)"]}
              </div>

              {/* Dimension */}
              <div className="flex justify-center align-items-center mt-0.5 ">
                {item["Height (UDF)"] && (
                  <>
                    <div className=" text-xs mr-2 ">{item["Height (UDF)"]}</div>
                    <div className=" text-xs mr-2 ">x</div>
                    <div className=" text-xs mr-2 ">{item["Length (UDF)"]}</div>
                    <div className=" text-xs mr-2 ">x</div>
                    <div className=" text-xs  ">{item["Width (UDF)"]}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CanadianTire;
