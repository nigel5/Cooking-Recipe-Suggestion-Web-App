import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography } from "@material-ui/core";
import IngredientSection from "./IngredientSection";

IngredientSectionList.propTypes = {
  //refactor when ingredientItem has ID
  recipeAndIngredientsList: PropTypes.arrayOf(
    PropTypes.shape({
      recipeName: PropTypes.string,
      ingredientList: PropTypes.arrayOf(
        PropTypes.shape({
          ingredientName: PropTypes.string,
        })
      ),
    })
  ),
};

const useStyles = makeStyles((theme) => ({
  ingredientsSection: {
    width: "60%",
  },
  ingredientsHeader: {
    marginBottom: "48px",
  },
  recipeIngredients: {
    marginBottom: "22px",
  },
  ingredientsSubsection: {
    marginBottom: "64px",
  },
}));

function IngredientSectionList(props) {
  let classes = useStyles();
  let { recipeAndIngredientsList } = props;
  return (
    <div className={classes.ingredientsSection}>
      <Typography variant="h4" className={classes.ingredientsHeader}>
        Ingredients
      </Typography>
      <div className={classes.recipeIngredients}>
        {recipeAndIngredientsList.map((recipeAndIngredients, index) => {
          return (
            <div key={index} className={classes.ingredientsSubsection}>
              <IngredientSection recipeAndIngredients={recipeAndIngredients} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IngredientSectionList;
