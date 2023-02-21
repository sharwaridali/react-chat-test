import React from "react";
import defaultAvatar from "../../images/default-avatar.png";
import ChatListItem from "./ChatListItem";
// import Profile from "./Profile";
import Search from "./Search";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <Search />
      <div className="chat-list">
        <ChatListItem avatar={defaultAvatar} />
        <ChatListItem avatar={defaultAvatar} />
        <ChatListItem avatar={defaultAvatar} />
        <ChatListItem avatar={defaultAvatar} />
        <ChatListItem avatar={defaultAvatar} />
      </div>
    </div>
  );
}

export default Sidebar;
