import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Outlet,
  Route,
  Link,
} from "react-router-dom";
import Ingredients from "./pages/Ingredients";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/ingredients">Ingredients</Link>
            </li>
          </ul>
        </nav>

        <Outlet />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/ingredients" element={<Ingredients />}></Route>
          <Route path="/recipes" element={<Recipes />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
