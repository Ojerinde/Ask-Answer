import "./Input.scss";

const Input = (props) => {
  const { field = "input", ...others } = props;

  return (
    <div className="input__group">
      <label>{props.label}</label>
      {field === "input" ? (
        <input {...others} ></input>
      ) : (
        <textarea  {...others}></textarea>
      )}
    </div>
  );
};
export default Input;



