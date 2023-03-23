import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../Firebase";
import ChatListItem from "./ChatListItem";
import Search from "./Search";

function Sidebar(props) {
  const { currentUser } = useContext(AuthContext);
  const [userChats, setUserChats] = useState({});

  console.log("userChats", userChats);

  useEffect(() => {
    if (currentUser.uid) {
      try {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (doc) => {
            // console.log("Current data: ", doc.data());
            setUserChats(doc.data());
          }
        );

        return () => {
          unsub();
        };
      } catch (err) {
        console.log("Error Fetching User Chats", err);
      }
    }
  }, [currentUser.uid]);

  return (
    <div className="sidebar-container">
      <Search toggleSidebar={props.toggleSidebar} />
      <div className="chat-list">
        {userChats &&
          Object.keys(userChats).length !== 0 &&
          Object.entries(userChats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => {
              console.log("userChats", chat);
              return (
                <ChatListItem
                  key={chat[0]}
                  avatar={chat[1].userInfo.photoURL}
                  displayName={chat[1].userInfo.displayName}
                  lastMessage={chat[1].lastMessage?.text}
                  date={Date(chat[1].date)}
                  userInfo={chat[1].userInfo}
                  toggleSidebar={props.toggleSidebar}
                />
              );
            })}

        {userChats && Object.keys(userChats).length === 0 && (
          <div className="tip-chat-list">
            <span> Search User Name</span>
            <span> & </span>
            <span> Start a Chat</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
