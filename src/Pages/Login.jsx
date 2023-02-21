import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { auth } from "../Firebase";

const Login = () => {
  const [form, updateForm] = useState({
    email: "",
    password: "",
  });
  const [error, raiseError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
    } catch (err) {
      raiseError(true);
    }
  };

  return (
    <div>
      <Header />
      <div className="formContainer">
        <div className="formWrapper">
          <span className="card-title">Login</span>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                updateForm({ ...form, email: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                updateForm({ ...form, password: e.target.value });
              }}
            />
            <button>Sign in</button>
          </form>
          {error && (
            <p className="error-message">Oops... Something went wrong</p>
          )}
          <p>
            Don't have an account?{" "}
            <Link className="link" to="/register">
              {" "}
              Sign up{" "}
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
