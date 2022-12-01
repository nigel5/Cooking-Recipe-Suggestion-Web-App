import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Outlet,
  Route,
} from "react-router-dom";
import { auth as firebaseAuth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./components/homepage/Navbar";
import Ingredients from "./pages/Ingredients";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipesList from "./pages/RecipesList";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [user, loading, auth] = useAuthState(firebaseAuth);

  useEffect(() => {
    console.log("user");
    console.log(user);
  }, [user]);
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
          <Route path="/recipes/:recipeId" element={<Recipes />}></Route>
          <Route path="/recipes" element={<RecipesList />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
