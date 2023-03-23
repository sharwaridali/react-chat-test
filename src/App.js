import React, { Suspense, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";

import "./styles/main.scss";
import "./styles/form.scss";
import Loading from "./components/Loading";
// import Header from "./components/Header";

const Home = React.lazy(() => import("./Pages/Home"));
const Login = React.lazy(() => import("./Pages/Login"));
const Register = React.lazy(() => import("./Pages/Register"));
const Header = React.lazy(() => import("./components/Header"));

export default function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const RedirectHomeRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Loading />}>
                      <Home />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="register"
                element={
                  <RedirectHomeRoute>
                    <Suspense fallback={<Loading />}>
                      <Register />
                    </Suspense>
                  </RedirectHomeRoute>
                }
              />
              <Route
                path="login"
                element={
                  <RedirectHomeRoute>
                    <Suspense fallback={<Loading />}>
                      <Login />
                    </Suspense>
                  </RedirectHomeRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
