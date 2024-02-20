import React from "react";
import "./Size.css"
const Size = (props) => {
  const { sizeData, setSize } = props;

  const handleClick = (selectedSize) => {
    setSize(selectedSize);
  };

  console.log("selects  = " , sizeData);
  return (
    <div className="sizes">
      <h3 className="product-heading">Size:</h3>
      <ul>
        {sizeData &&
          sizeData?.map((item, index) => (
            <li key={index}>
              <span
                onClick={() => handleClick(item?.title)}
                className="main-product-badge"
              >
                {item?.title}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Size;