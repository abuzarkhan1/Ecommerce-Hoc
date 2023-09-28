import React from "react";
import "./CustomInput.css"
const CustomInput = (props) => {
  const { type, label, i_id, i_class ,name,val,onChng,onBlr ,disabled}  = props;
  return (
    <div className="form-floating">
      <input
        type={type}
        className={`form-control-customInput ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onChng}
        onBlur={onBlr}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
