import React, { useState, useEffect, useContext } from "react";
import {
  auth as firebaseAuth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  getUserFromDB,
} from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@material-ui/core";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [user, loading, auth] = useAuthState(firebaseAuth);
  const navigate = useNavigate();
  const [userAcc, setUser] = useContext(UserContext);

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  const login = async () => {
    console.log("clicked Login button");
    const response = await logInWithEmailAndPassword(email, password);
    console.log("repsonse for login");
    console.log(response);

    sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
    sessionStorage.setItem("uid", response.user.uid);

    // Fetch user from firestore
    const userinfo = await getUserFromDB(response.user.uid);
    console.log("setting user");
    console.log(userinfo);
    setUser(userinfo);
    navigate("/"); // TODO: NAVIGATE TO THE PREVIOUS PAGE
  };

  useEffect(() => {
    console.log("userAcc: ");
    console.log(userAcc);
  }, [userAcc]);

  return (
    <div style={{ marginTop: "50px" }}>
      <input
        type="text"
        className="login__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className="login__textBox"
        value={password}
        onChange={(e) => setPass(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={login}>Login</Button>
      {/* <div>
        <Link to="/reset">Forgot Password</Link>
      </div> */}
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </div>
  );
};

export default Login;
