import React, { useState, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../firebase";
import { Button, CircularProgress } from "@material-ui/core";
import { UserContext } from "../UserContext";
import { getUserFromDB } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [userAcc, setUser] = useContext(UserContext);
  let navigate = useNavigate();

  const register = async () => {
    console.log("hello");
    if (!name) alert("Please enter name");
    const response = await registerWithEmailAndPassword(name, email, password);
    console.log("registered email and password");
    console.log(response);
    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
    sessionStorage.setItem("uid", response.user.uid);
    const userinfo = await getUserFromDB(response.user.uid);
    setUser(userinfo);
    navigate("/");
  };

  useEffect(() => {
    const authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      // User is logged in, user needs to logout to register
      navigate("/");
    }
  }, []);

    return <>{loading ? <CircularProgress /> : 
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
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
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button onClick={register} className="login__submit">
        <span className="button__text">Register</span>
        <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
      </button>
    </div>
  </div>
  //   <div style={{ marginTop: "50px" }}>
  //   <input
  //     type="text"
  //     className="register__textBox"
  //     value={name}
  //     onChange={(e) => setName(e.target.value)}
  //     placeholder="Full Name"
  //   />
  //   <input
  //     type="text"
  //     className="register__textBox"
  //     value={email}
  //     onChange={(e) => setEmail(e.target.value)}
  //     placeholder="E-mail Address"
  //   />
  //   <input
  //     type="password"
  //     className="register__textBox"
  //     value={password}
  //     onChange={(e) => setPassword(e.target.value)}
  //     placeholder="Password"
  //   />
  //   <Button className="register__btn" onClick={() => {register();
  //     }}>
  //     Register
  //   </Button>
  // </div>
  }</>
};

export default Register;
