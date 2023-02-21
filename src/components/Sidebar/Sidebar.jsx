import { doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../Firebase";
import defaultAvatar from "../../images/default-avatar.png";
import ChatListItem from "./ChatListItem";
// import Profile from "./Profile";
import Search from "./Search";

function Sidebar() {
  const { currentUser } = useContext(AuthContext);
  const [userChats, setUserChats] = useState({});

  useEffect(() => {
    try {
      const fetchChats = () => {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (doc) => {
            console.log("Current data: ", doc.data());
            setUserChats(doc.data());
          }
        );

        return () => {
          unsub();
        };
      };
      currentUser && fetchChats();
    } catch (err) {
      console.log("Error Fetching User Chats", err);
    }
  }, [currentUser.uid]);

  console.log(Object.entries(userChats));
  return (
    <div className="sidebar-container">
      <Search />
      <div className="chat-list">
        {Object.entries(userChats)?.map((chat) => {
          return (
            <ChatListItem
              key={chat[0]}
              avatar={chat[1].userInfo.photoURL}
              displayName={chat[1].userInfo.displayName}
              lastMessage={chat[1].userInfo.lastMessage?.text}
              date={Date(chat[1].date)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
