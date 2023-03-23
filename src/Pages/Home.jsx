import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import "../styles/sidebar.scss";
import "../styles/chat.scss";

const Home = () => {
  const toggleSidebar = () => {
    const screenWidth = window.innerWidth;
    // console.log("handle back");

    if (screenWidth < 768) {
      // console.log("screenWidth", screenWidth);
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

      // console.log("sidebar", sidebarContainer.classList);
      // console.log("chatContainer", chatContainer.classList);
    }
  };

  return (
    <div className="chat-body">
      <Sidebar toggleSidebar={toggleSidebar} />
      <Chat toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Home;
