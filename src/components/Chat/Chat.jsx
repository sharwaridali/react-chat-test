import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import moreIcon from "../../images/more.png";
import Input from "./Input";
import MessageBox from "./MessageBox";
import backIcon from "../../images/back-arrow-icon.png";

const Chat = (props) => {
  const { data } = useContext(ChatContext);
  console.log("data ", data);

  return (
    <div className="chat-container hiddden-chat">
      <div className="chat-info">
        <img
          onClick={props.toggleSidebar}
          src={backIcon}
          alt="go back"
          className="back-btn"
        />
        {data.chatId !== null && (
          <>
            <img src={data.user.photoURL} alt="avatar" className="avatar" />
            <div className="name">{data.user.displayName}</div>
            <img src={moreIcon} className="more-icon" alt="options" />
          </>
        )}
      </div>

      {data.chatId !== null && <MessageBox />}
      {data.chatId !== null && <Input />}
      {data.chatId === null && (
        <div className="tip-message-box">
          <span>Start a Chat</span>
        </div>
      )}
    </div>
  );
};

export default Chat;
