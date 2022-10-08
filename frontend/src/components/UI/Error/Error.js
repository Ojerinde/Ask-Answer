import { ImCross } from "react-icons/im";

const Error = (props) => {
  return (
    <div className="error__box">
      <ImCross className="close__message" onClick={props.onClick} />
      <p className="error__message">{props.message}</p>
    </div>
  );
};
export default Error;
