import React, { useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getByPlaceholderText } from "@testing-library/react";
import "./navbar.css";
import { auth as firebaseAuth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "../../UserContext";

const Navbar = () => {
  const [user, loading, auth] = useAuthState(firebaseAuth);
  const [userAcc, setUser] = useContext(UserContext);

  return (
    <div
      className="container"
      style={{ zIndex: 100, position: "fixed", top: 0, width: "100%" }}
    >
      <ul className="nav-type">
        <Link to="/" className="link">
          {/* <a href="/" className="link active"> */}
          Cook.io
          {/* </a> */}
        </Link>
        <div className="line"></div>
        <Link to="/" className="link">
          {/* <a href="/" className="link active"> */}
          Home
          {/* </a> */}
        </Link>
        <Link to="/ingredients" className="link">
          {/* <a href="/ingredients" className="link active1"> */}
          Ingredients
          {/* </a> */}
        </Link>
        <Link to="/recipes" className="link">
          {/* <a href="/recipes" className="link active2"> */}
          Recipes
          {/* </a> */}
        </Link>
        <Link to="/yourSavedRecipes" className="link">
          {/* <a href="/yourSavedRecipes" className="link"> */}
          Your Recipes
          {/* </a> */}
        </Link>
        <div style={{ marginLeft: "auto" }}>
          {sessionStorage.getItem("Auth Token") ? (
            <Button
              onClick={() => {
                sessionStorage.removeItem("Auth Token");
                sessionStorage.removeItem("uid");
                setUser(undefined);
                logout();
              }}
            >
              <span className="link"> Logout </span>
            </Button>
          ) : (
            <Link to="/login" className="link">
              Login
            </Link>
          )}
        </div>

        {/* <Link style={{ marginLeft: "auto" }}>
          {sessionStorage.getItem("Auth Token") ? (
            <a
              onClick={() => {
                sessionStorage.removeItem("Auth Token");
                logout();
              }}
              className="link"
            >
              Logout
            </a>
          ) : (
            <a href="/login" className="link">
              Login
            </a>
          )}
        </Link> */}
      </ul>
    </div>
  );
};

export default Navbar;
