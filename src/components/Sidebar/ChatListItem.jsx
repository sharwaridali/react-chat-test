const ChatListItem = (props) => {
  return (
    <div className="users-list">
      <div className="user">
        <img src={props.avatar} alt="avatar" className="avatar" />
        <div className="info">
          <div className="name">User Name</div>
          <p className="message">last message</p>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
