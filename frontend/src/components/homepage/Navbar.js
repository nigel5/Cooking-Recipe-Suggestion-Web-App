import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getByPlaceholderText } from "@testing-library/react";
import "./navbar.css";
import { auth as firebaseAuth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user, loading, auth] = useAuthState(firebaseAuth);

  useEffect(() => {
    console.log("user");
    console.log(user);

    if (user) {
    }
  }, [user]);

  return (
    <div
      className="container"
      style={{ zIndex: 100, position: "fixed", top: 0, width: "100%" }}
    >
      {/* <Typography variant="h4" className="">
        Cook.io
      </Typography> */}
      <ul className="nav-type">
        <li>
          <a href="/" className="active">
            Cook.io
          </a>
        </li>
        <div class="line"></div>
        <li>
          <a href="/" className="active">
            Home
          </a>
        </li>
        <li>
          <a href="/ingredients" className="active1">
            Ingredients
          </a>
        </li>
        <li>
          <a href="/recipes" className="active2">
            Recipes
          </a>
        </li>
        <li style={{ marginLeft: "auto" }}>
          {user ? (
            <a onClick={logout}>Logout</a>
          ) : (
            <a href="/login" className="">
              Login
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
