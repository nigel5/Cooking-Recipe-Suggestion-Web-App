import React from "react"
import PropTypes from 'prop-types';
import { Divider, makeStyles, Typography } from "@material-ui/core";
import StrikeThroughText from "./StrikeThroughText";


const useStyles = makeStyles((theme) => ({
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
}));

const DirectionSectionList = (props) => {
    DirectionSectionList.propTypes = {
        directionsList: PropTypes.arrayOf(PropTypes.shape({
            OrderOfStep: PropTypes.string,
            RecipeID: PropTypes.string,
            StepID: PropTypes.string,
            StepInfo: PropTypes.string
        }))
    }
    let classes = useStyles();
    let {directionsList} = props;
    return (
        <div className={classes.directionsSection}>
        <Typography variant="h4" className={classes.directionsHeader}>Directions</Typography>
        <div>
            {directionsList.sort((a,b) => a.OrderOfStep.localeCompare(b.OrderOfStep)).map((directionItem, index) => {
                return (
                    <div key={index} className={classes.directionItem}>
                    <div className={classes.directionsChecklistItem}>
                        <StrikeThroughText variant={"h6"} text={`${directionItem.OrderOfStep}.   ${directionItem.StepInfo}`}/>
                    </div>
                    {/* <div className={classes.directionsDescription}>
                        <Typography variant="body1"></Typography>
                    </div> */}
                    <Divider/>
                    </div>
                )
            })}
        </div> 
      </div>
        )
}

export default DirectionSectionList