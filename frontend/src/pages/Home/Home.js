import { Link } from "react-router-dom";
import MainHeader from "../../components/Header/MainHeader";

const Home = () => {
  return (
    <>
      <MainHeader />
      <main className="home">
        <div>
          <Link to="/frontend">Frontend Engineering</Link>
        </div>
        <div>
          <Link to="/backend">Backend Engineering</Link>
        </div>
        <div>
          <Link to="/cloud">Cloud Engineering</Link>
        </div>
      </main>
    </>
  );
};
export default Home;
