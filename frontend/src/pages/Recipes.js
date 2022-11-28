import {
  Avatar,
  Card,
  CardHeader,
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
import React from "react";
import {
  recipeAndIngredientsList,
  testRecipeItems,
} from "../testData/testData";
import RecipeCardList from "../components/RecipeCardList";
import IngredientSectionList from "../components/recipes/IngredientSectionList";
import StrikeThroughText from "../components/StrikeThroughText";

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
  },
  directionsChecklistItem: {
    display: "flex",
    alignItems: "center",
  },
  directionsDescription: {
    padding: "24px 24px 48px 24px",
  },
  directionsHeader: {
    marginBottom: "32px",
  },
  directionItem: {
    marginBottom: "48px",
  },
  directionsSection: {
    width: "60%",
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
  const classes = useStyles();
  return (
    <div>
      <div className={classes.sectionMargin}>
        <Typography variant="h1">Title of Food</Typography>
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
                <Typography variant="caption">15 MIN</Typography>
              </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.authorDetails}>
              <AccessTimeFilled style={{ marginRight: "16px" }} />
              <div>
                <Typography variant="subtitle2">COOK TIME</Typography>
                <Typography variant="caption">15 MIN</Typography>
              </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.authorDetails}>
              <Restaurant style={{ marginRight: "16px" }} />
              <Typography variant="caption">CHICKEN</Typography>
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
          <Image src="https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000"></Image>
        </div>
        <div className={classes.recipeMacros}>
          <Card className={classes.recipeMacrosCard}>
            <CardHeader title={"Nutrition Information "} />
            <List>
              <ListItem>
                <ListItemText primary="Calories" />
                <span>
                  <Typography>Test</Typography>
                </span>
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary="Total Fat" />
                <span>
                  <Typography>Test</Typography>
                </span>
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary="Protein" />
                <span>
                  <Typography>Test</Typography>
                </span>
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary="Carbohydrate" />
                <span>
                  <Typography>Test</Typography>
                </span>
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary="Cholesterol" />
                <span>
                  <Typography>Test</Typography>
                </span>
              </ListItem>
            </List>
            <div>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </div>
          </Card>
        </div>
      </div>
      <div className={classes.sectionMargin}>
        <Typography variant="subtitle1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </div>
      <div
        className={`${classes.sectionMargin} ${classes.ingredientsContainer}`}
      >
        <IngredientSectionList
          recipeAndIngredientsList={recipeAndIngredientsList}
        />
        <div className={classes.otherRecipesSection}>
          <Typography variant="h4" className={classes.otherRecipesHeader}>
            Other Recipes
          </Typography>
          <Card className={classes.otherRecipesCardItem}>
            <div className={classes.otherRecipesItem}>
              <div className={classes.otherRecipesItemPhoto}>
                <Image src="https://images-gmi-pmc.edge-generalmills.com/a7d7f227-8d99-4ebd-b224-f5338c0f0749.jpg"></Image>
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

      <div className={`${classes.sectionMargin} ${classes.directionsSection}`}>
        <Typography variant="h4" className={classes.directionsHeader}>
          Directions
        </Typography>
        <div className={classes.directionItem}>
          <div className={classes.directionsChecklistItem}>
            <StrikeThroughText
              variant={"h5"}
              text={"1. Lorem ipsum dolor sit amet"}
            />
          </div>
          <div className={classes.directionsDescription}>
            <Typography variant="body1">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </Typography>
          </div>
          <Divider />
        </div>

        <div className={classes.directionItem}>
          <div className={classes.directionsChecklistItem}>
            <StrikeThroughText
              variant={"h5"}
              text={"2. Lorem ipsum dolor sit amet"}
            />
          </div>
          <div className={classes.directionsDescription}>
            <Typography variant="body1">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </Typography>
          </div>
          <Divider />
        </div>

        <div className={classes.directionItem}>
          <div className={classes.directionsChecklistItem}>
            <StrikeThroughText
              variant={"h5"}
              text={"3. Lorem ipsum dolor sit amet"}
            />
          </div>
          <div className={classes.directionsDescription}>
            <Typography variant="body1">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </Typography>
          </div>
          <Divider />
        </div>

        <div className={classes.directionItem}>
          <div className={classes.directionsChecklistItem}>
            <StrikeThroughText
              variant={"h5"}
              text={"4. Lorem ipsum dolor sit amet"}
            />
          </div>
          <div className={classes.directionsDescription}>
            <Typography variant="body1">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </Typography>
          </div>
          <Divider />
        </div>
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
