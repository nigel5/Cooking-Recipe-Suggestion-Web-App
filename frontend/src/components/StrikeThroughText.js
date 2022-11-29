import { Checkbox, makeStyles, Typography } from "@material-ui/core";
import { CheckCircle, RadioButtonUnchecked,  } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    strikeThrough: {
      textDecoration: "line-through"
    },
    checklistItem: {
        display: "flex",
        alignItems: "center",
        padding: "12px",
    },
}));



const StrikeThroughText = (props) => {
    StrikeThroughText.propTypes = {
        //refactor when ingredientItem has ID
        text: PropTypes.string,
        variant: PropTypes.string,
    }
    let [strikeThrough, setStrikeThrough] = useState(false);
    let {text, variant} = props;
    let classes = useStyles();
    const handleCheckbox = () => {
        setStrikeThrough(!strikeThrough);
    }
    return (
    <div className={`${classes.checklistItem} ${strikeThrough ? classes.strikeThrough : ""}`}>
        <Checkbox icon={<RadioButtonUnchecked/>} checkedIcon={<CheckCircle/>} onChange={handleCheckbox} color={"primary"}/>
        <Typography variant={variant}> {text}</Typography>
    </div>)
}
export default StrikeThroughText;