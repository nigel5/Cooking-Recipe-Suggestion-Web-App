import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { React, useContext } from "react";
import PropTypes from "prop-types";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { saveRecipeForuser } from "../firebase";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  recipeCard: {
    width: "20%",
    margin: "40px",
    borderRadius: "10%",
  },
  recipeCardImg: {
    height: "275px",
    objectFit: "cover",
  },
  recipeCardContent: {
    paddingBottom: "36px",
    height: "215px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  labelChip: {
    marginRight: "24px",
  },
  viewRecipeButton: {
    width: "100%",
  },
  viewRecipeLink: {
    textDecoration: "none",
    width: "100%",
  },
}));

const recipeLink = "/recipes";

const RecipeCard = (props) => {
  RecipeCard.propTypes = {
    //refactor when recipeCardItem has ID
    recipeCardItem: PropTypes.shape({
      recipeName: PropTypes.string,
      timeLabel: PropTypes.string,
      recipeType: PropTypes.string,
      recipeImageLink: PropTypes.string,
    }),
    isOnSavedRecipes: PropTypes.bool,
  };
  const classes = useStyles();
  let { recipeCardItem } = props;
  const navigate = useNavigate();

  const [openSnack, setOpenSnack] = useState(false);
  
  const handleClose = () => {
    setOpenSnack(false);
  };

  const addSavedRecipe = () => {
    // Check if logged in
    const token = sessionStorage.getItem("Auth Token");
    const uid = sessionStorage.getItem("uid");

    if (token && uid) {
      // Save recipe
      saveRecipeForuser(uid, recipeCardItem);
      setOpenSnack(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <Card className={classes.recipeCard}>
      <CardMedia
        className={classes.recipeCardImg}
        component="img"
        image={recipeCardItem.ImgLink}
      />
      <CardContent className={classes.recipeCardContent}>
        <div>
          <Typography gutterBottom variant="h5" align="left">
            {recipeCardItem.Name}
          </Typography>
        </div>
        <div className={classes.actionsContainer}>
          <CardActions className={classes.actions}>
            <Chip label={"⏰ " + (recipeCardItem.CookTime ?? "0 mins")} />
            <Chip label={`🍴 ${recipeCardItem.Cuisine}`} />
          </CardActions>
          <CardActions>
            <Link
              className={classes.viewRecipeLink}
              to={`${recipeLink}/${recipeCardItem.RecipeID}`}
            >
              <Button
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
                className={classes.viewRecipeButton}
                variant="outlined"
                size="medium"
              >
                View Recipe
              </Button>
            </Link>
            {!props.isOnSavedRecipes && (
              <Button variant="outlined" onClick={addSavedRecipe}>
                Save Recipe
              </Button>
            )}
          </CardActions>
        </div>
      </CardContent>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message={`${recipeCardItem.Name} saved to Your Recipes !` }
      />
    </Card>
  );
};

export default RecipeCard;
