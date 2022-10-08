import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

const MainHeader = () => {
  return (
    <header className="home__header">
      <figure>
        <img src={logo} alt="AltSchool" />
      </figure>
      <nav>
        <ul>
          <li>
            <Link to="/">Sign Out</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
