import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "90%",
    margin: "10px",
  },
}));

const SearchField = (props) => {
  const classes = useStyles();
  return (
    <TextField
      id="outlined-basic"
      label={props.labelValue ? props.labelValue : "Enter a value"}
      variant="outlined"
      value={props.filter}
      className={classes.textField}
      onChange={props.handleChange}
    />
  );
};

SearchField.propTypes = {
  filter: PropTypes.string,
  handleChange: PropTypes.any,
  labelValue: PropTypes.string,
};

export default SearchField;
