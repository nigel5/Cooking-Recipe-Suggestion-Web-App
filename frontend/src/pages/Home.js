import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  body: {
    margin: "40px 82px 40px 82px",
  },
  homeCard: {
    margin: "40px",
    height: "640px",
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
    display: "inline-flex",
    alignItems: "center",
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
  },
  ingredientsCarousel: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  section: {
    marginBottom: "150px",
    textAlign: "center",
  },
  recipesList: {
    display: "flex",
  },
  recipeCard: {
    width: "33%",
    height: "400px",
  }
  
}));

const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
    <div className={classes.body}>
      <div className={classes.section}>
        <Card className={classes.homeCard} raised>
          <CardContent className={classes.cardContent}>
            <Chip label="🔥 Hot Recipe" />
            <Typography gutterBottom variant="h2" component="div">
              Sweet Chili Chicken Wings
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              These Keto Sweet Chili, Sticky Asian chicken wings combine two of my favorite 
              things: Asian flavors and wings! Using my air fryer wings or crispy baked 
              chicken wings with my low-carb sweet chili sauce, these are a great appetizer 
              and beat take-out any time!
            </Typography>
            <CardActions className={classes.cardChips}>
              <Chip label="⏰ 30 Minutes" />
              <Chip label="🐔 Chicken" />
            </CardActions>
            <div className={classes.authorDetails}>
              <Avatar style={{marginRight: "16px"}}>AD</Avatar>
              <div>
                <Typography variant="caption" paragraph>Alton D</Typography>
                <Typography variant="caption" paragraph>10 September 2022</Typography>
              </div>
            </div>
          </CardContent>
          <CardMedia
            className={classes.mainCardImg}
            component="img"
            image="https://c9u8e9q4.rocketcdn.me/wp-content/uploads/2020/01/Keto-Sweet-Chili-Wings-1-square.jpg"
            alt="green iguana"
          />
          
        </Card>
      </div>
      <div className={classes.section}>
        <div className={classes.ingredientsHeader}>
          <Typography variant="h3" gutterBottom>
            Ingredients
          </Typography>
          <Button>View All Ingredients</Button>
        </div>
        
        <div className={classes.ingredientsCarousel}>
          <Card className={classes.ingredientCard}>
            <CardMedia
                style={{marginBottom: "30px"}}
                component="img"
                image="https://encycolorpedia.com/emojis/cooked-rice.svg"
            />
            <Typography variant="h4" align="center">Rice</Typography>
          </Card>
          <Card className={classes.ingredientCard}>
            <CardMedia
                style={{marginBottom: "30px"}}
                component="img"
                image="https://emojiguide.org/images/emoji/q/1ho9vysgl820q.png"
            />
            <Typography variant="h4" align="center">Lettuce</Typography>
          </Card>
          <Card className={classes.ingredientCard}>
            <CardMedia
                style={{marginBottom: "30px"}}
                component="img"
                image="https://encycolorpedia.com/emojis/cut-of-meat.svg"
            />
            <Typography variant="h4" align="center">Beef</Typography>
          </Card>
          <Card className={classes.ingredientCard}>
            <CardMedia
                style={{marginBottom: "30px"}}
                component="img"
                image="https://encycolorpedia.com/emojis/cheese-wedge.svg"
            />
            <Typography variant="h4" align="center">Cheese</Typography>
          </Card>
          <Card className={classes.ingredientCard}>
            <CardMedia
                style={{marginBottom: "30px"}}
                component="img"
                image="https://encycolorpedia.com/emojis/bread.svg"
            />
            <Typography variant="h4" align="center">Bread</Typography>
          </Card>
          <Card className={classes.ingredientCard}>
            <CardMedia
                style={{marginBottom: "30px"}}
                component="img"
                image="https://encycolorpedia.com/emojis/potato.svg"
            />
            <Typography variant="h4" align="center">Potato</Typography>
          </Card>
        </div>
        
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.recipesHeader}>
          <Typography variant="h3" gutterBottom>
            Simple and tasy recipes
          </Typography>
          <Typography variant="body1" gutterBottom>
            Find new and easy recipes easily
          </Typography>  
        </div>
        <div className={classes.recipesList}>
          <Card className={classes.recipeCard}>
            <CardMedia
            component="img"
            image="https://www.peelwithzeal.com/wp-content/uploads/2021/11/wagyu-burger-10.jpg"
            alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
