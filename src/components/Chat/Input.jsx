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
  const [previewImg, setPreviewImg] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  useEffect(() => {
    // const reader = new FileReader();
    // reader.readAsDataURL(img);
    // reader.onload = (e) => setPreviewImg(this.result);
    img ? setPreviewImg(window.URL.createObjectURL(img)) : setPreviewImg(null);
  }, [img]);

  useEffect(() => {
    setText("");
    setImg(null);
  }, [data.chatId]);

  //TODO handle invalid image

  const handleSend = async () => {
    if (!img && text === "") return;
    try {
      if (img) {
        console.log("Image selected: ", img);
        // Upload image
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            setUploadProgress(
              (uploadProgress) =>
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "%"
            );
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                console.error(
                  "User doesn't have permission to access the object"
                );
                break;
              case "storage/canceled":
                // User canceled the upload
                console.error("User canceled the upload");
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                console.error("Unknown error occurred");
                break;
            }
          },
          () => {
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
            setUploadProgress(null);
          }
        );

        // uploadTask
        //   .then(() => {
        //     // Handle successful uploads on complete
        //     getDownloadURL(uploadTask.snapshot.ref).then(async (photoURL) => {
        //       await updateDoc(doc(db, "chats", data.chatId), {
        //         messages: arrayUnion({
        //           id: uuid(),
        //           senderId: currentUser.uid,
        //           text,
        //           date: Timestamp.now(),
        //           photoURL,
        //         }),
        //       });
        //     });
        //   })
        //   .catch((error) => {
        //     // Handle unsuccessful uploads
        //     console.log("Image upload failed");
        //   });
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
      {previewImg && (
        <div className="preview-image">
          <img src={previewImg} alt="upload preview" />
          {uploadProgress && (
            <div className="progress">{uploadProgress}</div>
          )}
        </div>
      )}
      <div className="inputs">
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
    </div>
  );
};

export default Input;
