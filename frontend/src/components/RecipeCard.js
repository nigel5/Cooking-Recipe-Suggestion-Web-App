import { Card, CardActions, CardContent, CardMedia, Chip, makeStyles, Typography } from "@material-ui/core";
import {React} from "react";
import PropTypes from 'prop-types';    

const useStyles = makeStyles((theme) => ({
    recipeCard: {
        width: "400px",
        margin: "40px",
        borderRadius: "10%",
      },
      recipeCardImg: {
        height: "275px",
        objectFit: "cover",
      },
      recipeCardContent: {
        paddingBottom: "36px",
      }
}));

const RecipeCard = (props) => {
  RecipeCard.propTypes = {
    //refactor when recipeCardItem has ID
    recipeCardItem: PropTypes.shape({
        recipeName: PropTypes.string,
        timeLabel: PropTypes.string,
        recipeType: PropTypes.string,
        recipeImageLink: PropTypes.string
    })
}
    const classes = useStyles();
    let {recipeCardItem} = props
    return (<Card className={classes.recipeCard}>
            <CardMedia
                className={classes.recipeCardImg}
                component="img"
                image = {recipeCardItem.recipeImageLink}
            />
            <CardContent className={classes.recipeCardContent}>
              <Typography gutterBottom variant="h5" align="left">
                {recipeCardItem.recipeName}
              </Typography>
              <CardActions>
                <Chip label={`⏰ ${recipeCardItem.timeLabel}`}/>
                <Chip label={`🍴 ${recipeCardItem.recipeType}`} />
            </CardActions>
            </CardContent>
          </Card>)
}

export default RecipeCard;