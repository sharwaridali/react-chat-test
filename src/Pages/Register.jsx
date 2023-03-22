import { auth, db, storage } from "../Firebase.js";
import { useState } from "react";
import avatar from "../images/add-avatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [error, raiseError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const createUsersCollection = async (uid, displayName, email, photoURL) => {
    await setDoc(doc(db, "users", uid), {
      uid,
      displayName,
      email,
      photoURL,
    });

    await setDoc(doc(db, "userChats", uid), {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.avatar) {
      window.alert("Choose Your Awesome Avatar");
      return;
    }

    setIsLoading(true);

    // const transformedName = form.name
    //   .split(" ")
    //   .map((token) => {
    //     return token[0].toUpperCase() + token.slice(1);
    //   })
    //   .join(" ");

    setForm({
      ...form,
      name: form.name.toLowerCase(),
    });

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const storageRef = ref(storage, form.email);
      const uploadTask = uploadBytesResumable(storageRef, form.avatar);

      uploadTask
        .then(() => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: form.name,
              photoURL: downloadURL,
            });

            /*create DB Users Collection*/
            createUsersCollection(
              res.user.uid,
              form.name,
              form.email,
              downloadURL
            );

            navigate("/");
          });
        })
        .catch((error) => {
          // Handle unsuccessful uploads
          raiseError(true);
        });
    } catch (err) {
      raiseError(true);
      console.log("Register Error");
    }
    setIsLoading(false);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="card-title">Register</span>

        <form onSubmit={handleSubmit}>
          <input
            className="effect-8"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
            required
          />

          <fieldset>
            <input
              type="file"
              id="file"
              onChange={(e) => {
                setForm({
                  ...form,
                  avatar: e.target.files[0],
                  imagePath: e.target.value,
                });
              }}
            />
            <label htmlFor="file">
              <img src={avatar} alt="avatar" />
              <span>
                {form.avatar !== "" ? form.avatar.name : "Add an avatar"}
              </span>
            </label>
          </fieldset>

          <button>{isLoading ? <Loading /> : "Sign up"}</button>
        </form>

        {error && <p className="error-message">Oops... Something went wrong</p>}
        <p>
          Already have an account?&nbsp;
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
