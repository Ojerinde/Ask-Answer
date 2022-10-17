import { useSelector } from "react-redux";
import Card from "../UI/Card/Card";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  return (
    <Card className="profile__card">
      <figure>
        <img src={`${user.img}`} />
      </figure>
      <h2>Name: {`${user.name}` || "No Name"}</h2>
      <div>
        <h4>Email: {`${user.email}` || "No Email"}</h4>
        <h4>Number: {user.phone ? `${user.phone}` : "No Number"}</h4>
      </div>
    </Card>
  );
};
export default UserProfile;
