import { React } from "react";
import PropTypes from "prop-types";
import { Divider, Typography } from "@material-ui/core";
import StrikeThroughText from "../StrikeThroughText";

IngredientSection.propTypes = {
  //refactor when ingredientItem has ID
  recipeAndIngredients: PropTypes.shape({
    recipeName: PropTypes.string,
    ingredientList: PropTypes.arrayOf(
      PropTypes.shape({
        ingredientName: PropTypes.string,
      })
    ),
  }),
};

function IngredientSection(props) {
  let { recipeName, ingredientList } = props.recipeAndIngredients;
  return (
    <div>
      <Typography variant="h5">{recipeName}</Typography>
      {ingredientList.map((ingredient, index) => {
        return (
          <div key={index}>
            <StrikeThroughText
              text={ingredient.ingredientName}
              variant={"body1"}
            />
            <Divider />
          </div>
        );
      })}
    </div>
  );
}

export default IngredientSection;
