import React from "react";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const ShowCatalog = ({ items, customState }) => {
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
                //src="https://via.placeholder.com/150"
                src={correctPath}
                alt="step3"
              />
              <div className="text-sm font-base mt-2 text-center block part-number">
                {item["Inventory Type"].includes("SN") && (
                  <span className="text-md font-bold position-new">New</span>
                )}
                {item["Part No"]}
              </div>

              {/* Price */}
              {/** flex-1 */}
              <div className="flex flex-col text-center">
                {/* Conditional render for P1 and P3 or just P1 */}
                {item["Sell 01"] < item["Sell 03"] ? (
                  <>
                    <div className="text-center mt-0.5 flex flex-row justify-center align-center">
                      <div className=" text-sm font-normal">REG:</div>
                      &nbsp;
                      <div className="text-sm font-normal text-center">
                        ${item["Sell 03"]}
                      </div>
                    </div>
                    <div className="text-center mt-0.5 flex flex-row justify-center align-center">
                      <>
                        <div className="text-base font-extrabold text-red-700 ">
                          SALE:
                        </div>
                        &nbsp;
                        <div className="text-base font-extrabold text-red-700 text-center ">
                          ${item["Sell 01"]}
                        </div>
                      </>
                    </div>
                  </>
                ) : (
                  <div className="text-center mt-0.5 ">
                    <div className="text-base font-bold ">
                      ${item["Sell 01"]}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-small text-gray-700 mt-2 block text-center">
                {item["Description"]}
              </div>

              {/* Dimension */}
              <div className="flex justify-center items-center text-center">
                {item["Height (UDF)"] && (
                  <>
                    <div className="text-xs mr-2">{item["Length (UDF)"]}"</div>
                    <div className="text-xs mr-2">x</div>
                    <div className="text-xs mr-2">{item["Width (UDF)"]}"</div>
                    <div className="text-xs mr-2">x</div>
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

export default ShowCatalog;
