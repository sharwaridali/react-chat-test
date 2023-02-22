import image_icon from "../../images/image-icon.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log("current User", currentUser);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    setText("");
    setImg(null);
  }, [data.chatId]);

  //TODO handle invalid image

  const handleSend = async () => {
    if (!img && text === "") return;
    try {
      if (img) {
        // Upload image
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask
          .then(() => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then(async (photoURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  senderId: currentUser.uid,
                  text,
                  date: Timestamp.now(),
                  photoURL,
                }),
              });
            });
          })
          .catch((error) => {
            // Handle unsuccessful uploads
            console.log("Image upload failed");
          });
      } else {
        // Add to message array
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            senderId: currentUser.uid,
            text,
            date: Timestamp.now(),
          }),
        });
      }
    } catch (error) {
      console.log("Error handleSend", error);
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setImg(null);
    setText("");
  };

  return (
    <div className="user-input">
      <input
        type="text"
        value={text}
        onKeyDown={(e) => {
          e.code === "Enter" && handleSend();
        }}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message here ..."
      />
      <div className="send">
        {/* <img className="attachment" src={attach_icon} alt="Attach" /> */}
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          accept="image/png, image/jpeg, image/jpg"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
          <img
            className="image-button"
            // src={img !== null ? URL.createObjectURL(img) : image_icon}
            src={image_icon}
            alt="send"
          />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
