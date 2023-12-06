import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #0f4f7c 20%, #33a7cc 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
  },
  label: {
    textTransform: "capitalize",
  },
});

const Index = (props) => {
  const { title } = props;
  const classes = useStyles();
  const { isSubmitting } = useSelector((state) => ({
    isSubmitting: state.isSubmitting,
  }));
  return (
    <Button
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      size="large"
      color="primary"
      type="submit"
      variant="contained"
      fullWidth
      disabled={isSubmitting ? true : false}
    >
      {isSubmitting ? (
        <Fragment>
          <span
            className="spinner-border spinner-border-sm loading_button p-2"
            role="status"
          ></span>
        </Fragment>
      ) : (
        <Fragment>{title}</Fragment>
      )}
    </Button>
  );
};
export default Index;
