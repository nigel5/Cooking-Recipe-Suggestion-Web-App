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
    if (!authToken) {
      navigate("/login");
    }
    if (uid && authToken) {
      retrieveAllRecipesForUser(uid);
    }
  }, []);

  const retrieveAllRecipesForUser = async (uid) => {
    const recipes = await getAllRecipesForUser(uid);
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
      {savedRecipes.length === 0 && (
        <Typography variant="p" style={{ paddingTop: "20px" }}>
          Looks like you don't have any recipes saved yet.
        </Typography>
      )}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {savedRecipes.map((recipe, index) => {
          return (
            <RecipeCard
              key={index}
              isOnSavedRecipes={true}
              recipeCardItem={recipe}
            />
          );
        })}
      </div>
    </div>
  );
};

export default YourSavedRecipes;
