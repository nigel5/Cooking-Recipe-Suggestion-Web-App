import React from "react";
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

// const useStyles = makeStyles((theme) => ({
//   navlinks: {
//     marginLeft: theme.spacing(10),
//     display: "flex",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   logo: {
//     flexGrow: "1",
//     cursor: "pointer",
//   },
//   link: {
//     textDecoration: "none",
//     color: "black",
//     fontSize: "20px",
//     marginLeft: theme.spacing(20),
//     "&:hover": {
//       color: "yellow",
//       fontWeight: "bold",
//     },
//   },
//   navigation: {
//     position: "absolute",
//     transform: "translate(-50%, -50%)",
//     top: "50%",
//     left: "50%",
//   },
//   nav_type: {
//     animation: "3s myWorld ease linear",
//   },
//   "@keyframes myWorld": {
//     "0%": {
//       opacity: 0,
//     },

//     "100%": {
//       opacity: 1,
//     },
//   },
//   active: {
//     transition: "1s",
//   },
//   active1: {
//     transition: "1s",
//   },
//   active2: {
//     transition: "1s",
//   },
//   active3: {
//     transition: "1s",
//   },
// }));

const Navbar = () => {
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
      </ul>
    </div>
  );
};

export default Navbar;
