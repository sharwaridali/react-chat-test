import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import defaultAvatar from "../../images/default-avatar.png";
import moreIcon from "../../images/more.png";
import Input from "./Input";
import MessageBox from "./MessageBox";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log("data ", data);
  return (
    <div className="chat-container">
      {data.chatId !== null && (
        <div className="chat-info">
          <img src={data.user.photoURL} alt="avatar" className="avatar" />
          <div className="name">{data.user.displayName}</div>
          <img src={moreIcon} className="more-icon" alt="options" />
        </div>
      )}

      {data.chatId !== null && <MessageBox />}
      {data.chatId !== null && <Input />}
    </div>
  );
};

export default Chat;
