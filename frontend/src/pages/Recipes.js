import {
  Avatar,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  AccessTimeFilled,
  IosShare,
  Print,
  Restaurant,
} from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "mui-image";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  recipeAndIngredientsList,
  testRecipeItems,
} from "../testData/testData";
import RecipeCardList from "../components/RecipeCardList";
import IngredientSectionList from "../components/recipes/IngredientSectionList";
import StrikeThroughText from "../components/StrikeThroughText";
import { getRecipesById, getRecipesByPage } from "../services/dataService";
import DirectionSectionList from "../components/DirectionsSectionList";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.info.main}`,
    color: theme.palette.info.main,
  },
  recipeHeader: {
    display: `flex`,
  },
  sectionMargin: {
    margin: "80px",
  },
  authorDetails: {
    marginRight: "40px",
    paddingLeft: "32px",
    paddingRight: "32px",
    display: "flex",
    alignItems: "center",
  },
  recipeButtons: {
    display: "flex",
  },
  recipePhoto: {
    borderRadius: "15px",
    width: "55%",
  },
  recipeMacros: {
    width: "35%",
    marginLeft: "40px",
  },
  imageSection: {
    display: "flex",
    maxHeight: "600px",
    justifyContent: "space-between",
  },
  recipeMacrosCard: {
    borderRadius: "15px",
    height: "100%",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  otherRecipesSection: {
    width: "30%",
  },
  ingredientsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  otherRecipesItem: {
    display: "flex",
    alignItems: "center",
  },
  otherRecipesItemDescription: {
    width: "40%",
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  otherRecipesItemPhoto: {
    width: "60%",
    height: "150px",
    borderRadius: "10px",
  },
  otherRecipesHeader: {
    marginBottom: "32px",
  },
  otherRecipesCardItem: {
    marginBottom: "24px",
  },
  suggestionsSection: {
    textAlign: "center",
  },
  recipeButtonItem: {
    paddingLeft: "32px",
    paddingRight: "32px",
  },
  headerSpacing: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Recipes = () => {
  const params = useParams();
  const [recipeData, setRecipeData] = useState({});
  const [directionSteps, setDirectionSteps] = useState({});
  const [ingredientList, setIngredientList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { recipeId } = params;
    getRecipesById(recipeId).then((data) => {
      setRecipeData(data.recipe);
      setDirectionSteps(data.steps);
      setIngredientList(data.ingredients);
      setIsLoading(false);
      console.log(directionSteps);
    });
  }, [params]);

  const classes = useStyles();

  return isLoading ? (
    <CircularProgress />
    ) : (
    <div>
      <div className={classes.sectionMargin}>
        <Typography variant="h1">{recipeData.Name}</Typography>
        <div className={classes.headerSpacing}>
          <div className={classes.recipeHeader}>
            <div
              className={classes.authorDetails}
              style={{ paddingLeft: "0px" }}
            >
              <Avatar style={{ marginRight: "16px" }}>XD</Avatar>
              <div>
                <Typography variant="subtitle2">Mico C</Typography>
                <Typography variant="caption">10 September 2022</Typography>
              </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.authorDetails}>
              <AccessTimeFilled style={{ marginRight: "16px" }} />
              <div>
                <Typography variant="subtitle2">PREP TIME</Typography>
                <Typography variant="caption">{recipeData.Prep}</Typography>
              </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.authorDetails}>
              <AccessTimeFilled style={{ marginRight: "16px" }} />
              <div>
                <Typography variant="subtitle2">COOK TIME</Typography>
                <Typography variant="caption">{recipeData.CookTime ?? recipeData.PrepTime}</Typography>
              </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.authorDetails}>
              <Restaurant style={{ marginRight: "16px" }} />
              <Typography variant="caption">{recipeData.Cuisine}</Typography>
            </div>
          </div>
          <div className={classes.recipeButtons}>
            <div className={classes.recipeButtonItem}>
              <Avatar>
                <Print />
              </Avatar>
              <Typography>Print</Typography>
            </div>
            <div className={classes.recipeButtonItem}>
              <Avatar>
                <IosShare />
              </Avatar>
              <Typography>Share</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes.imageSection} ${classes.sectionMargin}`}>
        <div className={classes.recipePhoto}>
          <Image src={recipeData.ImgLink}></Image>
        </div>
        <div className={classes.recipeMacros}>
          <Card className={classes.recipeMacrosCard}>
            <div>
              <CardHeader title={"Nutrition Information "} />
              <List>
                <ListItem>
                  <ListItemText primary="Calories" />
                  <span>
                    <Typography>{recipeData.Calories}</Typography>
                  </span>
                </ListItem>
                <Divider light />
                <ListItem>
                  <ListItemText primary="Total Fat" />
                  <span>
                    <Typography>{recipeData.Fat}</Typography>
                  </span>
                </ListItem>
                <Divider light />
                <ListItem>
                  <ListItemText primary="Protein" />
                  <span>
                    <Typography>{recipeData.Protein}</Typography>
                  </span>
                </ListItem>
                <Divider light />
                <ListItem>
                  <ListItemText primary="Carbohydrate" />
                  <span>
                    <Typography>{recipeData.Carbs}</Typography>
                  </span>
                </ListItem>
              </List>
            </div>
            <div>{recipeData.Description}</div>
          </Card>
        </div>
      </div>
      <div className={classes.sectionMargin}>
        <Typography variant="subtitle1">{recipeData.Description}</Typography>
      </div>
      <div
        className={`${classes.sectionMargin} ${classes.ingredientsContainer}`}
      >
        <IngredientSectionList
          recipeName={recipeData.Name}
          ingredientList={ingredientList}
        />
        <div className={classes.otherRecipesSection}>
          <Typography variant="h4" className={classes.otherRecipesHeader}>
            Other Recipes
          </Typography>
          <Card className={classes.otherRecipesCardItem}>
            <div className={classes.otherRecipesItem}>
              <div className={classes.otherRecipesItemPhoto}>
                <Image src={recipeData.ImgLink}></Image>
              </div>
              <div className={classes.otherRecipesItemDescription}>
                <Typography variant="h5">Meatballs and Pasta</Typography>
                <Typography variant="caption">By John Smith</Typography>
              </div>
            </div>
          </Card>
          <Card className={classes.otherRecipesCardItem}>
            <div className={classes.otherRecipesItem}>
              <div className={classes.otherRecipesItemPhoto}>
                <Image src="https://hips.hearstapps.com/hmg-prod/images/190409-mexican-corn-on-the-cob-horizontal-1-1555623819.png"></Image>
              </div>
              <div className={classes.otherRecipesItemDescription}>
                <Typography variant="h5">Mexican Street Corn</Typography>
                <Typography variant="caption">By Felipe D</Typography>
              </div>
            </div>
          </Card>
          <Card className={classes.otherRecipesCardItem}>
            <div className={classes.otherRecipesItem}>
              <div className={classes.otherRecipesItemPhoto}>
                <Image src="https://cdn.tasteatlas.com/Images/Dishes/5eb9df1828d84079a850ebe462e28121.jpg"></Image>
              </div>
              <div className={classes.otherRecipesItemDescription}>
                <Typography variant="h5">Lechon</Typography>
                <Typography variant="caption">By Melchizideck C</Typography>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className={`${classes.sectionMargin}`}>
        <DirectionSectionList
          directionsList={directionSteps}
        ></DirectionSectionList>
      </div>
      <div>
        <div className={classes.suggestionsSection}>
          <Typography variant="h4">You may also like</Typography>
        </div>
        <div>
          <RecipeCardList recipeCardList={testRecipeItems} />
        </div>
      </div>
    </div>
  );
};

export default Recipes;
