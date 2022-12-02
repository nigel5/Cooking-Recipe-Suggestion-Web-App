import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { getAllRecipesForUser } from "../firebase";
import RecipeCard from "../components/RecipeCard";
import { Typography } from "@material-ui/core";

const YourSavedRecipes = () => {
  const navigate = useNavigate();
  const [userAcc] = useContext(UserContext);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");
    const uid = sessionStorage.getItem("uid");
    console.log(authToken);
    if (!authToken) {
      navigate("/login");
    }
    retrieveAllRecipesForUser(uid);
  }, []);

  const retrieveAllRecipesForUser = async (uid) => {
    const recipes = await getAllRecipesForUser(uid);
    console.log("Saved recipes");
    console.log(recipes);
    setSavedRecipes(recipes);
  };

  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");
    const uid = sessionStorage.getItem("uid");

    if (!userAcc && !authToken && !uid) {
      navigate("/login");
    }
  }, [userAcc]);

  return (
    <div style={{ marginTop: "50px" }}>
      <Typography variant="h2">Your Saved Recipes</Typography>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {savedRecipes.map((recipe, index) => {
          return <RecipeCard key={index} recipeCardItem={recipe} />;
        })}
      </div>
    </div>
  );
};

export default YourSavedRecipes;
