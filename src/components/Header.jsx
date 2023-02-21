import React, { useContext } from "react";
import "../styles/header.scss";
import Profile from "./Profile";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={"header" + (!currentUser ? " center" : "")}>
      <div className="brand-name">React Chat</div>
      {currentUser && (
        <Profile
          displayName={currentUser.displayName}
          avatar={currentUser.photoURL}
        />
      )}
    </div>
  );
};

export default Header;
