import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Outlet,
  Route,
  Link,
} from "react-router-dom";
import Navbar from "./components/homepage/Navbar";
import Ingredients from "./pages/Ingredients";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Outlet />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div style={{ height: "80px" }} />
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
