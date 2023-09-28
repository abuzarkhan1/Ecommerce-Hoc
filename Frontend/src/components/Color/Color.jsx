import React from "react";

const Color = (props) => {
  const {colorData , setColor} = props;
  console.log("color" , colorData);
  return (
    <>
      <ul className="colors">
       {
        colorData && colorData?.map((item,index)=>{
          return(
            <li onClick={()=>{setColor(item?._id)}} style={{backgroundColor:item?.title , "cursor" : "pointer"}} key={index}></li>
          )
        })
       }
      </ul>
    </>
  );
};

export default Color;
