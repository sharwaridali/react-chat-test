import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatListItem = (props) => {
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (userInfo) => {
    const screenWidth = window.innerWidth;
    console.log("handle ChatListItem");

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

    // console.log("handle select userInfo", userInfo);
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    // <div className="users-list">
    <div className="user" onClick={() => handleSelect(props.userInfo)}>
      <img src={props.avatar} alt="avatar" className="avatar" />
      <div className="info">
        <div className="name">{props.displayName}</div>
        <p className="message">{props.lastMessage}</p>
      </div>
    </div>
    // </div>
  );
};

export default ChatListItem;
