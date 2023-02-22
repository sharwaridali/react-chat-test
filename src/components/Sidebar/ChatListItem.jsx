import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatListItem = (props) => {
  const { dispatch } = useContext(ChatContext);
  const handleSelect = (userInfo) => {
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
