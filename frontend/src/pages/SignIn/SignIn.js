import {
  auth,
  provider,
  signInWithRedirect,
  onAuthStateChanged,
} from "../../components/Authentication/FireBaseAuth";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { profileActions } from "../../store/ProfileSlice";

import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          profileActions.addUser({
            name: user.displayName,
            email: user.email,
            phone: user.phone,
            img: user.photoURL,
          })
        );
        navigate("/home");
      } else {
        console.log("No user");
      }
    });
  }, []);

  return (
    <Card className="sign_in">
      <h4>Sign in below</h4>
      <Button onClick={loginHandler}>Sign In</Button>
    </Card>
  );
};
export default SignIn;
