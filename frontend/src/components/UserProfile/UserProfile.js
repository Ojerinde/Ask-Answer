import { useSelector } from "react-redux";
import Card from "../UI/Card/Card";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  return (
    <Card className="profile__card">
      <figure>
        {<img src={`${user.img}`} alt={user.name} />|| <p>No Image</p>}
      </figure>
      <div>
        <h2>
          Name: <span>{`${user.name}` || "No Name"}</span>{" "}
        </h2>
        <h4>
          Email: <span>{`${user.email}` || "No Email"}</span>
        </h4>
        <h4>
          Number:<span>{user.phone ? `${user.phone}` : "No Number"}</span>
        </h4>
      </div>
    </Card>
  );
};
export default UserProfile;
