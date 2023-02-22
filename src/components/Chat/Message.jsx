import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({message}) => {
  // console.log("props", props);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const owner = currentUser.uid === message.senderId;
  const ownerClass = owner ? " owner" : "";

  const msgRef = useRef();
  useEffect(()=>{
msgRef.current?.scrollIntoView({behavior: "smooth"})
  },[message]);


  return (
    <div ref={msgRef} className={"message" + ownerClass}>
      <div className={"message-info" + ownerClass}>
        <img
          src={owner ? currentUser.photoURL : data.user.photoURL}
          alt="avatar"
        />
        {/* <span>{message.date}</span> */}
      </div>
      <div className={"message-content" + ownerClass}>
        <p>{message.text}</p>
        {message.photoURL && <img src={message.photoURL} alt="" />}
      </div>
    </div>
  );
};

export default Message;
