import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../Firebase";
import Loading from "../../Pages/Loading";

const Search = () => {
  const [inputUser, setInputUser] = useState("");
  const [users, setUsers] = useState([]);
  const [error, raiseError] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const SearchedUsers = ({ users }) => {
    const handleSelect = async (user) => {
      // check whether the group(Userchats in firestore) exists or not,
      // if not create new one
      console.log("user", user);
      console.log("current User", currentUser);
      const combinedID =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      try {
        const docRef = doc(db, "chats", combinedID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          // create chat in chats collection
          await setDoc(doc(db, "chats", combinedID), { messages: [] });

          // create user's chat list in usersChat collection
          // for currentUser
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedID + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedID + ".date"]: serverTimestamp(),
          });

          // for user selected
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedID + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedID + ".date"]: serverTimestamp(),
          });

          // retrieve data from userChats and
          // CHANGE_USER in chatContext
          const userChats = await getDoc(doc(db, "userChats", currentUser.uid));
          if (userChats.exists())
            Object.entries(userChats.data())?.forEach((chat) => {
              // console.log(chat);
              if (chat[0] === combinedID) {
                dispatch({ type: "CHANGE_USER", payload: chat[1].userInfo });
              }
            });
        } else {
          console.log("Document data:", docSnap.data());
        }
      } catch (err) {
        console.log("Error Handle Search", err);
      }

      setInputUser("");
      setUsers([]);
    };

    return (
      <div className="chat-list">
        {users?.length !== 0 &&
          users.map((user) => {
            // Filter current user using uid
            return (
              <div
                className="user"
                key={user.uid}
                onClick={() => handleSelect(user)}
              >
                <img src={user.photoURL} alt="avatar" className="avatar" />
                <div className="info">
                  <div className="name">{user.displayName}</div>
                  <p className="message">last message</p>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    setUsers([]);
    setUserNotFound(false);
    raiseError(false);

    const q = query(
      collection(db, "users"),
      where("displayName", "==", inputUser)
    );

    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUsers((users) => [...users, doc.data()]);
        console.log(doc.id, " => ", doc.data());
      });
      if (users.length === 0) {
        raiseError(true);
      }
      setUserNotFound(querySnapshot.empty);
    } catch (err) {
      raiseError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="search-box">
      <input
        className="search"
        type="text"
        placeholder="Search User"
        onKeyDown={handleKey}
        onChange={(e) => {
          setUsers([]);
          raiseError(false);
          setUserNotFound(false);
          setInputUser(e.target.value);
        }}
        value={inputUser}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          {userNotFound && <p className="error-message">User not found</p>}
          <SearchedUsers users={users} />
        </>
      )}
    </div>
  );
};

export default Search;
