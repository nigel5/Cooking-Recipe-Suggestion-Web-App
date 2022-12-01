import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const YourSavedRecipes = () => {
  const navigate = useNavigate();
  const [userAcc] = useContext(UserContext);

  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");
    console.log(authToken);
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");
    const uid = sessionStorage.getItem("uid");

    if (!userAcc && !authToken && !uid) {
      navigate("/login");
    }
  }, [userAcc]);

  return <div style={{ marginTop: "50px" }}>Your Saved Recipes.</div>;
};

export default YourSavedRecipes;
