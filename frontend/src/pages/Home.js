import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { testRecipeItems } from "../testData/testData";
import RecipeCardList from "../components/RecipeCardList";
import { getRandomRecipe, getRecipesById, getRecipesByPage } from "../services/dataService";

const useStyles = makeStyles((theme) => ({
  body: {
    margin: "40px 82px 40px 82px",
  },
  trendingCard: {
    margin: "40px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainCardImg: {
    width: "50%",
    objectFit: "cover",
  },
  cardContent: {
    width: "50%",
    margin: "0 50px 0 50px",
  },
  authorDetails: {
    marginTop: "104px",
  },
  cardChips: {
    marginTop: "30px",
  },
  ingredientsHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  ingredientCard: {
    height: "100%",
    width: "10%",
    padding: "16px",
    borderRadius: "10%",
    backgroundImage: "linear-gradient(180deg, white, #E6E9EA)"
  },
  ingredientsCarousel: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  section: {
    marginBottom: "150px",
    textAlign: "center",
  },
  viewRecipeButton: {
    width: "100%",
  },
  linkRoute: {
    textDecoration: "none",
    color: "black"
  },
  recipesHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipesHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }
}));

const Home = () => {
  const classes = useStyles();
  const recipeLink = "/recipes";
  const ingredientsLink = "/ingredients";
  const randomPage = Math.floor(Math.random() * (140 - 1) + 1);
  // const params = useParams();
  const [featuredRecipeData, setFeaturedRecipeData] = useState({});
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const {recipeId} = params;
    getRandomRecipe().then((data) => {
      setFeaturedRecipeData(data.recipe);
      // setDirectionSteps(data.steps);
      setIsLoading(false);
    });

    getRecipesByPage(randomPage).then((data) => {
      setRecipeList(data.data);
    });
  }, []);

  return (
    isLoading ? <CircularProgress /> :
    <div className={classes.body}>
      <div className={classes.trendingSection}>
        <Card className={classes.trendingCard} raised>
          <CardContent className={classes.cardContent}>
            <Chip label="🔥 Hot Recipe" />
            <Typography gutterBottom variant="h2" component="div">
              { featuredRecipeData.Name }
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              { featuredRecipeData.Description }
            </Typography>
            <CardActions className={classes.cardChips}>
              <Chip label={"⏰ " + (featuredRecipeData.CookTime ?? featuredRecipeData.Prep) } />
              <Chip label={"🍴 " + featuredRecipeData.Cuisine} />
            </CardActions>
            <div className={classes.authorDetails}>
              {/* <Avatar style={{marginRight: "16px"}}>AD</Avatar>
              <div>
                <Typography variant="caption">Alton D</Typography>
                <Typography variant="caption" paragraph>10 September 2022</Typography>
              </div> */}
              <Link className={classes.linkRoute} to={`${recipeLink}/${featuredRecipeData.RecipeID}`}>
                <Button className={classes.viewRecipeButton} variant="contained" >View Recipe</Button> 
              </Link>
            </div>
          </CardContent>
          <CardMedia
            className={classes.mainCardImg}
            component="img"
            image={featuredRecipeData.ImgLink}
          />
        </Card>
      </div>
      <div className={classes.section}>
        <div className={classes.ingredientsHeader}>
          <Typography variant="h3" gutterBottom>
            Ingredients
          </Typography>
          <Link className={classes.linkRoute} to={ingredientsLink}>
            <Button>View All Ingredients</Button>
          </Link>
        </div>
        
        <div className={classes.ingredientsCarousel}>
          <Card className={classes.ingredientCard}>
            <Link className={classes.linkRoute} to={ingredientsLink}>
              <CardMedia
                  style={{marginBottom: "30px"}}
                  component="img"
                  image="https://encycolorpedia.com/emojis/cooked-rice.svg"
              />
              <Typography variant="h4" align="center">Rice</Typography>
            </Link>
          </Card>
          <Card className={classes.ingredientCard}>
            <Link className={classes.linkRoute} to={ingredientsLink}>
              <CardMedia
                  style={{marginBottom: "30px"}}
                  component="img"
                  image="https://emojiguide.org/images/emoji/q/1ho9vysgl820q.png"
              />
              <Typography variant="h4" align="center">Lettuce</Typography>
            </Link>
          </Card>
          <Card className={classes.ingredientCard}>
            <Link className={classes.linkRoute} to={ingredientsLink}>
              <CardMedia
                  style={{marginBottom: "30px"}}
                  component="img"
                  image="https://encycolorpedia.com/emojis/cut-of-meat.svg"
              />
              <Typography variant="h4" align="center">Beef</Typography>
            </Link>
          </Card>
          <Card className={classes.ingredientCard}>
            <Link className={classes.linkRoute} to={ingredientsLink}>
              <CardMedia
                  style={{marginBottom: "30px"}}
                  component="img"
                  image="https://encycolorpedia.com/emojis/cheese-wedge.svg"
              />
              <Typography variant="h4" align="center">Cheese</Typography>
            </Link>
          </Card>
          <Card className={classes.ingredientCard}>
            <Link className={classes.linkRoute} to={ingredientsLink}>
              <CardMedia
                  style={{marginBottom: "30px"}}
                  component="img"
                  image="https://encycolorpedia.com/emojis/bread.svg"
              />
              <Typography variant="h4" align="center">Bread</Typography>
            </Link>
          </Card>
          <Card className={classes.ingredientCard}>
            <Link className={classes.linkRoute} to={ingredientsLink}>
              <CardMedia
                  style={{marginBottom: "30px"}}
                  component="img"
                  image="https://encycolorpedia.com/emojis/potato.svg"
              />
              <Typography variant="h4" align="center">Potato</Typography>
            </Link>
          </Card>
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.recipesHeaderContainer}>
          <div className={classes.recipesHeader}>
            <Typography variant="h3" gutterBottom>
              Simple and Tasty Recipes
            </Typography>
            <Typography variant="body1" gutterBottom>
              Find new and easy recipes easily
            </Typography>  
          </div>
          <div>
            <Link className={classes.linkRoute} to={recipeLink}>
              <Button className={classes.viewRecipeButton}>View All Recipes</Button> 
            </Link>
          </div>
          
        </div>
        <div>
          <RecipeCardList recipeCardList={recipeList}/>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
