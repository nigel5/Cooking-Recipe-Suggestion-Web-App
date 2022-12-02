import React, { useEffect, useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button,
  Snackbar,
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

  const [openSnack, setOpenSnack] = useState(false);

  const handleClose = () => {
    setOpenSnack(false);
  };

  return (
    <div
      className="container"
      style={{ zIndex: 100, position: "fixed", top: 0, width: "100%" }}
    >
      <ul className="nav-type">
        <Link to="/" className="link">
          Cook.io
        </Link>
        <div className="line"></div>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/ingredients" className="link">
          Ingredients
        </Link>
        <Link to="/recipes" className="link">
          Recipes
        </Link>
        <Link to="/yourSavedRecipes" className="link">
          Your Recipes
        </Link>
        <div style={{ marginLeft: "auto" }}>
          {sessionStorage.getItem("Auth Token") ? (
            <Link
              className="link"
              onClick={() => {
                sessionStorage.removeItem("Auth Token");
                sessionStorage.removeItem("uid");
                setUser(undefined);
                setOpenSnack(true);
                logout();
              }}
              to="/"
            >
              <span className="link"> Logout </span>
            </Link>
          ) : (
            <Link to="/login" className="link">
              Login
            </Link>
          )}
        </div>
      </ul>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Logged Out !"
      />
    </div>
  );
};

export default Navbar;
