import ReactDOM from "react-dom";

const Overlay = (props) => {
  return <p className="backdrop" onClick={props.onClick}>{props.message}</p>;
};

const Backdrop = (props) => {
  return <div className="overlay" onClick={props.onClick}></div>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick}/>,
        document.getElementById("backdrop_root")
      )}
      {ReactDOM.createPortal(
        <Overlay onClick={props.onClick}/>,
        document.getElementById("backdrop_root")
      )}
    </>
  );
};
export default Modal;
