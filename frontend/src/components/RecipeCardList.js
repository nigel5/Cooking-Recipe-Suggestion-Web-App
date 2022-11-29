
import {React} from "react";
import PropTypes from 'prop-types';    
import RecipeCard from "./RecipeCard";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    recipesList: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      },
}));

const RecipeCardList = (props) => {
    RecipeCardList.propTypes = {
        recipeCardList: PropTypes.array
    }
    let classes = useStyles();
    let {recipeCardList} = props;
    return (
    <div className={classes.recipesList}> {
        recipeCardList.map((recipeCardItem, index) => {
            //refactor when recipeCardItem has ID
        return <RecipeCard key={index} recipeCardItem={recipeCardItem}/>
        })}
    </div>
)}

export default RecipeCardList