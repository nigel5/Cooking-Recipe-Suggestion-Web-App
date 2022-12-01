import React, { useState, useEffect } from "react";
import {
  auth as firebaseAuth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@material-ui/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [user, loading, auth] = useAuthState(firebaseAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    console.log(user);
    if (user) navigate("/");
  }, [user, loading]);

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
      <Button onClick={() => logInWithEmailAndPassword(email, password)}>
        Login
      </Button>
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
