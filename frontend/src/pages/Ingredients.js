import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import SearchField from "../components/SearchField";
import IngredientsList from "../components/ingredients/IngredientsList";
import { testIngredientsList } from "../testData/testData";
import { getRecipesByIngredients } from "../services/dataService";
import RecipeCardList from "../components/RecipeCardList";
import { Pagination } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  sectionMargin: {
    margin: "50px",
    touchAction: "none",
  },
  headerSpacing: {
    display: "flex",
    justifyContent: "space-between",
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  sectionContainer: {
    marginBottom: "40px",
  }
}));

const Ingredients = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const [ingredients, setIngredients] = useState();
  const [selectedIngrs, setSelectedIngrs] = useState([]);
  const [matchedRecipes, setMatchedRecipes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [noSearchResults, setNoSearchResults] = useState(false);

  useEffect(() => {
    populateIngredientsList();
  }, []);

  const populateIngredientsList = () => {
    setIngredients([...testIngredientsList]);
  };

  const onChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === null || event.target.value.length > 0) {
      setPageNumber(1);
    }
  };

  const handleCardClick = (e, ingredientName, ingredientImage) => {
    setMatchedRecipes([]);
    setNoSearchResults(false);
    console.log(ingredientName + ", " + ingredientImage);
    // Add element if it doesn't already exist in list
    const element = selectedIngrs.find(
      (ingr) => ingr.ingredientName === ingredientName
    );
    if (!element) {
      setSelectedIngrs([
        ...selectedIngrs,
        { ingredientName, ingredientImageLink: ingredientImage },
      ]);
    }
  };

  const handleSelectedCardClick = (e, ingredientName, ingredientImage) => {
    setMatchedRecipes([]);
    setNoSearchResults(false);
    console.log(`${ingredientName}, ${ingredientImage}`);
    setSelectedIngrs((ingrs) => {
      const newingrs = [...ingrs];
      const index = newingrs.findIndex(
        (ingr) => ingr.ingredientName === ingredientName
      );
      if (index == -1) {
        return ingrs;
      }
      newingrs.splice(index, 1);
      return newingrs;
    });
  };
  const handleSearchClick = () => {
    let ingredients = selectedIngrs.map((ingredient) =>
      ingredient.ingredientName.toLowerCase().replaceAll(" ", "-")
    );
    getRecipesByIngredients(ingredients).then((data) => {
      setMatchedRecipes(data.results);
      if(data.results.length === 0) {
        setNoSearchResults(true);
      } else {
        setNoSearchResults(false);
      }
    });
  };
  const handlePageNumber = (event, pageNumber) => {
    setPageNumber(pageNumber);
  };
  return (
    <div className={classes.sectionMargin}>
      <div style={{ marginBottom: "50px" }}>
        <Typography variant="h1">Ingredients</Typography>
        {/* <div className={classes.headerSpacing}></div> */}
        <Typography gutterBottom variant="body1">
          Search for the ingredients you have at home here and we will show you what recipes you can use !
        </Typography>
      </div>
      <SearchField
        filter={filter}
        handleChange={onChange}
        labelValue={"Enter an ingredient name"}
      />
      <div>
        <IngredientsList
          ingredients={
            ingredients &&
            ingredients
              .filter((ingr) =>
                ingr.ingredientName
                  .toLowerCase()
                  .indexOf(filter === undefined ? "" : filter.toLowerCase()) > -1
              )
              .sort((a, b) => a.ingredientName.localeCompare(b.ingredientName))
              .slice((pageNumber - 1) * 10, pageNumber * 10)
          }
          handleCardClick={handleCardClick}
          listId={"notSelected"}
        />
      </div>
      <div className={`${classes.centerContainer} ${classes.sectionContainer}`}>
        <Pagination
          count={
            ingredients && ingredients.filter((ingr) =>
              ingr.ingredientName
                .toLowerCase()
                .indexOf(filter === undefined ? "" : filter.toLowerCase()) > -1
            )
              ? Math.floor(
                  ingredients.filter((ingr) =>
                    ingr.ingredientName
                      .toLowerCase()
                      .indexOf(filter === undefined ? "" : filter.toLowerCase()) > -1
                  ).length / 10
                )
              : 200
          }
          color="primary"
          onChange={(event, pageNumber) => handlePageNumber(event, pageNumber)}
          page={pageNumber}
        />
      </div>
      
      {selectedIngrs.length > 0 && (
        <div className={classes.sectionContainer}>
          <div className={classes.centerContainer}>
            <Typography variant="h2">Your Selected Ingredients</Typography>
          </div>
          <IngredientsList
            ingredients={selectedIngrs}
            listId={"selected"}
            handleCardClick={handleSelectedCardClick}
          />
          <div className={classes.centerContainer}>
            <Button variant="contained" onClick={handleSearchClick} color="primary">
              Search for Recipes
            </Button>
          </div>
        </div>

        
      )}
      {matchedRecipes.length > 0 && (
        <div className={classes.sectionContainer}>
          <Typography variant="h2">Search Results ({matchedRecipes.length})</Typography>
          <RecipeCardList recipeCardList={matchedRecipes}></RecipeCardList>{" "}
        </div>
      )}
      {noSearchResults && (
        <div className={classes.sectionContainer}>
          <div className={classes.centerContainer}>
            <Typography variant="h2">Search Results ({matchedRecipes.length})</Typography>
          </div>
          <div className={classes.centerContainer}>
            <Typography gutterBottom variant="body1">
              No Search Results !
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingredients;
