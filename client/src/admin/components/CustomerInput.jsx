import React from "react";
import "./customInput.css";
const CustomerInput = (props) => {
  const { type, label, i_id, i_class, name, val, onChng, onBlr } = props;
  return (
    <div className="custom-input">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onChng}
        onBlur={onBlr}
      />
      <label htmlFor={label} className="label"></label>
    </div>
  );
};

export default CustomerInput;
