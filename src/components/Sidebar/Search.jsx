import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { Suspense, useState } from "react";
import { db } from "../../Firebase";
import Loading from "../../Pages/Loading";

const SearchedUsers = ({ users }) => {
  const handleSelect = async (key) => {
    //check whether the group(chats in firestore) exists or not, if not create new one
    console.log(key);
    // console.log(user);
    // const docRef = doc(db, "userChats", key);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  };

  return (
    <div className="users-list">
      {users?.length !== 0 &&
        users.map((user) => {
          // Filter current user using uid
          return (
            <div className="user" key={user.uid} onClick={handleSelect}>
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

const Search = () => {
  const [inputUser, setInputUser] = useState("");
  const [users, setUsers] = useState([]);
  const [error, raiseError] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
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
      />

      {isLoading ? (
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
