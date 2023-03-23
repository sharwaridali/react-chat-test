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
    const screenWidth = window.innerWidth;
    console.log("handle back");

    if (screenWidth < 768) {
      console.log("screenWidth", screenWidth);
      let sidebarContainer =
        document.getElementsByClassName("sidebar-container")[0];
      // sidebarContainer.style.display = "none";
      if (sidebarContainer.classList.contains("hidden-sidebar"))
        sidebarContainer.classList.remove("hidden-sidebar");
      else sidebarContainer.classList.add("hidden-sidebar");

      let chatContainer = document.getElementsByClassName("chat-container")[0];
      // chatContainer.style.display = "flex";
      if (chatContainer.classList.contains("hiddden-chat"))
        chatContainer.classList.remove("hiddden-chat");
      else chatContainer.classList.add("hiddden-chat");

      console.log("sidebar", sidebarContainer.classList);
      console.log("chatContainer", chatContainer.classList);
    }
  };

  return (
    <div className="chat-container hiddden-chat">
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
