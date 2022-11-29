import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@mui/material";
import { getRecipesByPage } from "../services/dataService";
import RecipeCardList from "../components/RecipeCardList";

const useStyles = makeStyles((theme) => ({}));

const RecipesList = () => {
  let classes = useStyles();
  const [pageNumber, setPageNumber] = useState(1);
  const [recipeCardList, setRecipeCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getRecipesByPage(pageNumber).then((data) => {
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
    <div>
    <Typography variant="h4">Recipes</Typography>
      <RecipeCardList recipeCardList={recipeCardList} />
      <div>
        <Pagination
          count={143}
          color="primary"
          onChange={(event, pageNumber) => handlePageNumber(event, pageNumber)}
        />
      </div>
    </div>
  );
};

export default RecipesList;
