import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import moreIcon from "../../images/more.png";
import Input from "./Input";
import MessageBox from "./MessageBox";
import backIcon from "../../images/back-arrow-icon.png";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log("data ", data);

  const handleBack = () => {
    console.log("hangle back");
    let sidebarContainer =
      document.getElementsByClassName("sidebar-container")[0];
    sidebarContainer.style.display = "flex";
    let chatContainer = document.getElementsByClassName("chat-container")[0];
    chatContainer.style.display = "none";
  };

  return (
    <div className="chat-container">
      <div className="chat-info">
        <img
          onClick={handleBack}
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
