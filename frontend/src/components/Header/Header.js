import { NavLink, useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";

const Header = (props) => {
  const navigate = useNavigate();
  const goHomeHandler = () => {
    navigate("/home");
  };
  return (
    <header className="main__header">
      <div className="logo">
        <ImHome className="home__icon" onClick={goHomeHandler} />
        <h3>{props.track}</h3>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="all_questions"
              className={({ isActive }) => (isActive ? "header__active" : "")}
            >
              All Questions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add_question"
              className={({ isActive }) => (isActive ? "header__active" : "")}
            >
              Add Question
            </NavLink>
          </li>
          <li>
            <NavLink
              to="answered_questions"
              className={({ isActive }) => (isActive ? "header__active" : "")}
            >
              Answered Questions
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
