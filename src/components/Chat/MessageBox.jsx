import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../Firebase";
import Message from "./Message";

const MessageBox = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data.chatId) {
      try {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          // console.log("Current data: ", doc.data().messages);
          doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
          unsub();
        };
      } catch (error) {
        console.log("error message fetch", error);
      }
    }
  }, [data.chatId]);

  console.log("Messages", messages);

  return (
    <div className="message-box">
      {messages.map((msg) => {
        return (
          <Message
            key={msg.id}
            message={msg}
          />
        );
      })}
    </div>
  );
};

export default MessageBox;
