import { Link, Route, Routes } from "react-router-dom";
import MainHeader from "../../components/Header/MainHeader";
import UserProfile from "../../components/UserProfile/UserProfile";

const Home = () => {
  return (
    <>
      <MainHeader />
      <Routes>
        <Route
          path=""
          element={
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
          }
        />
        <Route path="profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};
export default Home;
