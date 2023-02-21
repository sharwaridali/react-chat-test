import Message from "./Message";

const MessageBox = () => {
  return (
    <div className="message-box">
      <Message owner={true} />
      <Message owner={true} />
      <Message />
      <Message />
      <Message owner={true} />
      <Message img={"https://kbob.github.io/images/sample-5.jpg"} />
      <Message owner={true} />
      <Message img={"https://kbob.github.io/images/sample-5.jpg"} />
      <Message
        img={
          "http://www.cameraegg.org/wp-content/uploads/2016/01/Nikon-D500-Sample-Images-2.jpg"
        }
      />
      <Message
        owner={true}
        img={
          "http://www.cameraegg.org/wp-content/uploads/2016/01/Nikon-D500-Sample-Images-2.jpg"
        }
      />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default MessageBox;
