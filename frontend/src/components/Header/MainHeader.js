import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../../components/Authentication/FireBaseAuth";

import logo from "../../assets/logo.png";
import Button from "../UI/Button/Button";

import { profileActions } from "../../store/ProfileSlice";
import { useDispatch } from "react-redux";

const MainHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SignOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(profileActions.removeUser());
        navigate("/");
      })
      .catch((error) => {
        alert("Alert: " + error.message);
      });
  };
  return (
    <header className="home__header">
      <figure>
        <img src={logo} alt="AltSchool" />
      </figure>
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Button onClick={SignOutHandler}>Sign Out</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
