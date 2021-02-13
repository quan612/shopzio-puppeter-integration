import React from "react";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Custom = ({ items, customState }) => {
  return (
    <>
      {items.map((item, index) => {
        const imagePath = item["ImagePath"];
        const correctPath = imagePath.replace("Z:", "http://127.0.0.1:8080");
        console.log(imagePath);
        if (
          customState &&
          customState.usOnly == true &&
          item["Inventory Type"].includes("SC")
        ) {
          return;
        }
        return (
          <div
            className="inline-block justify-center max-w-1/4 min-w-1/4 h-card relative mb-6 ml-0.5 pl-1 pr-1"
            key={item["Part No"]}
          >
            <div className="flex flex-col h-full">
              <img
                className=" object-scale-down h-30 block"
                // src="https://via.placeholder.com/150"
                src={correctPath}
                alt="step3"
              />
              <div className="text-sm font-base mt-1 text-center block part-number">
                {item["Inventory Type"].includes("SN") && (
                  <span className="text-md font-bold position-new">New</span>
                )}
                {item["Part No"]}
              </div>

              {/* Price */}
              <div className="text-center mt-1.5">
                {/* Conditional render for P1 and P3 or just P1 */}
                {item["Sell 01"] < item["Sell 03"] ? (
                  <>
                    <div className=" flex flex-row justify-center align-center text-sm font-normal">
                      <div>REG:</div>
                      <div className="ml-1">${item["Sell 03"]}</div>
                    </div>
                    <div className="flex flex-row justify-center align-center text-base font-extrabold text-red-700">
                      <div>SALE:</div>
                      <div className="ml-1">${item["Sell 01"]}</div>
                    </div>
                  </>
                ) : (
                  <div className="text-base font-bold ">${item["Sell 01"]}</div>
                )}
              </div>

              <div className="text-small text-gray-700 mt-1 block text-center">
                {item["Description"]}
              </div>

              {/* UPC */}
              <div className="text-sm text-left text-gray-700 ">
                UPC: {item["UPC"]}
              </div>

              {/* Dimension */}
              <div className="flex justify-center items-center text-center">
                {item["Height (UDF)"] && (
                  <>
                    <div className="text-xs mr-0.5">
                      {item["Length (UDF)"]}"
                    </div>
                    <div className="text-xs mr-0.5">x</div>
                    <div className="text-xs mr-0.5">{item["Width (UDF)"]}"</div>
                    <div className="text-xs mr-0.5">x</div>
                    <div className="text-xs">{item["Height (UDF)"]}"</div>
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

export default Custom;
