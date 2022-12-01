import React from "react";
import { Card, CardMedia, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  ingredientCard: {
    width: "17.5%",
    minWidth: "150px",
    padding: "16px",
    borderRadius: "10%",
    backgroundImage: "linear-gradient(180deg, white, #E6E9EA)"
  },
  cardContent: {
    width: "50%",
    margin: "0 50px 0 50px",
  },
  cardMedia: {
    userDrag: "none",
    "-webkit-user-drag": "none",
    "user-select": "none",
    "-moz-user-select": "none",
    "-webkit-user-select": "none",
    "-ms-user-select": "none",
    marginBottom: "30px",
  },
}));

const IngredientCard = (props) => {
  const classes = useStyles();
  const ingrName = props.ingrName;
  const ingrImage = props.ingrImage;

  return (
    <Card
      className={classes.ingredientCard}
      onClick={(e) => props.handleClick(e, ingrName, ingrImage)}
      id={ingrName}
    >
      <CardMedia
        className={classes.cardMedia}
        component="img"
        image={ingrImage}
      />
      <Typography variant="h4" align="center">
        {ingrName}
      </Typography>
    </Card>
  );
};

export default IngredientCard;
IngredientCard.propTypes = {
  ingrName: PropTypes.string,
  ingrImage: PropTypes.string,
  handleClick: PropTypes.any,
};
