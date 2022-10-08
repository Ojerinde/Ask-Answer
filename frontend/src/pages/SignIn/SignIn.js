import { useNavigate } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";

const SignIn = () => {
  const navigate = useNavigate();
  const GoHomeHandler = () => {
    navigate("/home");
  };
  return (
    <Card className="sign_in">
      <h4>Sign in below</h4>
      <Button onClick={GoHomeHandler} type='button'>Sign In</Button>
    </Card>
  );
};
export default SignIn;
