const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`${props.className} button`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
export default Button;
