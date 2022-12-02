import React, { useState, useEffect, useContext } from "react";
import {
  auth as firebaseAuth,
  logInWithEmailAndPassword,
  getUserFromDB,
} from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Modal } from "@material-ui/core";
import { UserContext } from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [user, loading] = useAuthState(firebaseAuth);
  const navigate = useNavigate();
  const [userAcc, setUser] = useContext(UserContext);

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  const login = async () => {
    const response = await logInWithEmailAndPassword(email, password);
    sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
    sessionStorage.setItem("uid", response.user.uid);

    // Fetch user from firestore
    const userinfo = await getUserFromDB(response.user.uid);
    setUser(userinfo);
    navigate("/"); // TODO: NAVIGATE TO THE PREVIOUS PAGE
  };

  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div className="login">
        <div className="login__field">
          <FontAwesomeIcon icon={faUser} className="login__icon" />
          <input
            type="text"
            className="login__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
        </div>
        <div className="login__field">
          <FontAwesomeIcon icon={faLock} className="login__icon" />
          <input
            type="password"
            className="login__input"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="button login__submit">
          <span className="button__text">Login</span>
          <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
        </button>
        <div>
          <Link to="/register" className="login__submit">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
