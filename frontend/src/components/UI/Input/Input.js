import React from "react";


const Input = React.forwardRef((props, ref) => {
  const { field = "input", ...others } = props;
  

  return (
    <div className="input__group">
      <label>{props.label}</label>
      {field === "input" ? (
        <input {...others} ref={ref}></input>
      ) : (
        <textarea  {...others} ref={ref}></textarea>
      )}
    </div>
  );
});
export default Input;



