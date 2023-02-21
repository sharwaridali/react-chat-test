import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

const Profile = (props) => {
  function name() {
    if (props.displayName)
      return (
        props.displayName.charAt(0).toUpperCase() + props.displayName.slice(1)
      );
    else return "";
  }

  // console.log(name);

  return (
    <div className="profile">
      <div className="info">
        <div className="name">{name()}</div>
        <button className="logout" onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>
      <img src={props.avatar} alt="avatar" className="avatar" />
    </div>
  );
};

export default Profile;
