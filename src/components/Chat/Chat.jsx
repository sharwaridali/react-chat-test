import React from "react";
import defaultAvatar from "../../images/default-avatar.png";
import moreIcon from "../../images/more.png";
import Input from "./Input";
import MessageBox from "./MessageBox";

const Chat = () => {
  return (
    <div className="chat-container">
      <div className="chat-info">
        <img src={defaultAvatar} alt="avatar" className="avatar" />
        <div className="name">User Name</div>
        <img src={moreIcon} className="more-icon" alt="options" />
      </div>
      <MessageBox />
      <Input />
    </div>
  );
};

export default Chat;
