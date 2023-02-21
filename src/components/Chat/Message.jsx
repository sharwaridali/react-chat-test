import defaultAvatar from "../../images/default-avatar.png";

const Message = (props) => {
  return (
    <div className={"message" + (props.owner ? " owner" : "")}>
      <div className={"message-info" + (props.owner ? " owner" : "")}>
        <img src={defaultAvatar} alt="avatar" />
        <span>just now</span>
      </div>
      <div className={"message-content" + (props.owner ? " owner" : "")}>
        <p>This is a message</p>
        <img src={props.img} alt="" />
      </div>
    </div>
  );
};

export default Message;
