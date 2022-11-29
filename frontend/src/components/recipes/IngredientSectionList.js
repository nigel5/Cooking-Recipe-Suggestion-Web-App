import React from "react";
import PropTypes from "prop-types";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import StrikeThroughText from "../StrikeThroughText";

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

const IngredientSectionList = (props) => {
  IngredientSectionList.propTypes = {
    //refactor when ingredientItem has ID
    recipeAndIngredientsList: PropTypes.shape({
        recipeName: PropTypes.string,
        ingredientList: PropTypes.arrayOf(
          PropTypes.shape({
            RecipeIngredientID: PropTypes.string,
            RawIngredient: PropTypes.string,
            RecipeID: PropTypes.string,
          })
        ),
      })
  };
  let classes = useStyles();
  let { recipeName, ingredientList } = props;
  return (
    <div className={classes.ingredientsSection}>
      <Typography variant="h4" className={classes.ingredientsHeader}>
        Ingredients
      </Typography>
      <div className={classes.recipeIngredients}>
        {
            <div className={classes.ingredientsSubsection}>
              <div>
                <Typography variant="h5">{recipeName}</Typography>
                {ingredientList.map((ingredient) => {
                  return (
                    <div key={ingredient.RecipeIngredientID}>
                      <StrikeThroughText
                        text={ingredient.RawIngredient}
                        variant={"body1"}
                      />
                      <Divider />
                    </div>
                  );
                })}
              </div>
            </div>
            }
      </div>
    </div>
  );
};

export default IngredientSectionList;
