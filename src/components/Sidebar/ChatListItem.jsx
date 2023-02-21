const ChatListItem = (props) => {
  return (
    // <div className="users-list">
      <div className="user">
        <img src={props.avatar} alt="avatar" className="avatar" />
        <div className="info">
          <div className="name">{props.displayName}</div>
          <p className="message">{props.lastMessage} hello </p>
        </div>
      </div>
    // </div>
  );
};

export default ChatListItem;
