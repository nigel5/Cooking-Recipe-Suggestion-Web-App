import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import IngredientCard from "./IngredientCard";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    flexWrap: "wrap",
    padding: 20,
    rowGap: "10px",
    gap: "20px",
    width: "100%",
    "@media (min-width: 1500px)": {
      width: "100%",
    },
    justifyContent: "center",
  },
  grid2: {
    width: "100%",
    height: "500px",
  },
}));
const IngredientsList = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.grid}>
      {props.ingredients ? (
        props.ingredients
          .map((ingr) => {
            return (
              <IngredientCard
                handleClick={props.handleCardClick}
                ingrName={ingr.ingredientName}
                ingrImage={ingr.ingredientImageLink}
              />
            );
          })
      ) : (
        <Typography variant="p">Uh oh. No ingredients found.</Typography>
      )}
      {}
    </div>
  );
};

IngredientsList.propTypes = {
  filter: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ingredientName: PropTypes.string,
      ingredientImageLink: PropTypes.string,
    })
  ),
  handleCardClick: PropTypes.any,
  listId: PropTypes.string,
};

export default IngredientsList;
