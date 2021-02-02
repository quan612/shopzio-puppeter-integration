import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
const Barcode = require("react-barcode");

const CanadianTire = ({ items, customState }) => {
  console.log(customState);
  return (
    <>
      {items.map((item, index) => {
        const imagePath = item["ImagePath"];
        const correctPath = imagePath.replace("Z:", "http://127.0.0.1:8080");

        if (
          customState &&
          customState.usOnly == true &&
          item["Inventory Type"].includes("SC")
        ) {
          return;
        }

        return (
          <div
            className="inline-block justify-center max-w-1/3 min-w-1/3 h-card350 relative mb-3 ml-0.5 pl-1 pr-1"
            key={item["Part No"]}
          >
            <div className="flex flex-col h-full">
              <img
                className=" object-scale-down h-30 block"
                //src="https://via.placeholder.com/150"
                src={correctPath}
                alt="https://via.placeholder.com/150"
              />

              {/* UPC */}
              <div className="text-xs font-base text-left">
                <Barcode
                  value={item["UPC"]}
                  width={1}
                  height={20}
                  displayValue={true}
                  fontSize={10}
                />
              </div>

              {/* HL number */}
              <div className="text-sm font-base text-left">
                <span className="">HL#: </span>
                <span className="font-bold"> {item["Part No"]}</span>
              </div>

              {/* Canadian Tire Number */}
              <div className="text-xs block text-left">
                <span>CTC: </span>
                <span className="text-sm font-bold">
                  {item["Canadian Tire Part Number (UDF)"]}
                </span>
              </div>

              {/* Wholesale Price */}
              <div className="text-center">
                {/* {item["Inventory Type"].includes("SN") && (
                  <span className="text-lg font-bold position-new">New</span>
                )} */}
                <span className="text-lg font-bold ">${item["Sell 01"]}</span>
              </div>

              {/* Description */}
              <div className="text-small max-w-85/100">
                {item["Description"]}
              </div>

              {/* On hand 
              <div className="text-xs text-gray-700 mt-1 block text-center">
                On Hand: {item["On Hand"]}
              </div>
              */}

              {/* Dimension */}
              <div className="flex justify-center items-center text-center">
                {item["Height (UDF)"] && (
                  <>
                    <div className=" text-xs mr-2 ">
                      {item["Height (UDF)"]}"
                    </div>
                    <div className=" text-xs mr-2 ">x</div>
                    <div className=" text-xs mr-2 ">
                      {item["Length (UDF)"]}"
                    </div>
                    <div className=" text-xs mr-2 ">x</div>
                    <div className=" text-xs  ">{item["Width (UDF)"]}"</div>
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
