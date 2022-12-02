import React, { useState, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase";
import { Button, CircularProgress } from "@material-ui/core";
import { UserContext } from "../UserContext";
import { getUserFromDB } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [userAcc, setUser] = useContext(UserContext);
  let navigate = useNavigate();

  const register = async () => {
    if (!name) alert("Please enter name");
    const response = await registerWithEmailAndPassword(name, email, password);
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

    return <>{loading ? <CircularProgress /> : <div style={{ marginTop: "50px" }}>
    <input
      type="text"
      className="register__textBox"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Full Name"
    />
    <input
      type="text"
      className="register__textBox"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="E-mail Address"
    />
    <input
      type="password"
      className="register__textBox"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
    />
    <Button className="register__btn" onClick={() => {register();
      }}>
      Register
    </Button>
  </div>}</>
};

export default Register;
