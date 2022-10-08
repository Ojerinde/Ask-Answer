import { ImSpinner11 } from "react-icons/im";
import Card from "../Card/Card";

const LoadingSpinner = () => {
  return (
    <Card className="spinner__box">
      <ImSpinner11 className="spinner__spinner" />
    </Card>
  );
};
export default LoadingSpinner;
