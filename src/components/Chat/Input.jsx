// import send_button from "../../images/send-icon-green.png";
import image_icon from "../../images/image-icon.png";
import attach_icon from "../../images/attach-icon.png";

const Input = () => {
  return (
    <div className="user-input">
      <input type="text" placeholder="type your message here ..." />
      <div className="send">
        <img className="attachment" src={attach_icon} alt="Attach" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img className="image-button" src={image_icon} alt="send" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
