import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@mui/material";
import { getRecipesByPage } from "../services/dataService";
import RecipeCardList from "../components/RecipeCardList";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  container: {
    marginTop: "40px",
    marginBottom: "40px",
  },
  paginationBarContainer: {
    display: "flex",
    justifyContent: "center",
  }
}));

const RecipesList = () => {
  let classes = useStyles();
  const [pageNumber, setPageNumber] = useState(1);
  const [recipeCardList, setRecipeCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getRecipesByPage(pageNumber, 8).then((data) => {
      setRecipeCardList(data.data);
      setIsLoading(false);
    });
  }, [pageNumber]);
  const handlePageNumber = (event, pageNumber) => {
    setPageNumber(pageNumber);
  };
  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h2">
        All Recipes
      </Typography>
      <Typography className={classes.title} variant="h5" gutterBottom>
          Find new and easy recipes easily
      </Typography> 
      <RecipeCardList recipeCardList={recipeCardList} />
      <div className={classes.paginationBarContainer}>
        <Pagination
          count={178}
          color="primary"
          onChange={(event, pageNumber) => handlePageNumber(event, pageNumber)}
        />
      </div>
    </div>
  );
};

export default RecipesList;
