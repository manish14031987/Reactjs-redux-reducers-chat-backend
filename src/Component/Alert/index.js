import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { loadToasterClose } from "../../actions/baseActions";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Toaster() {
  const classes = useStyles();
  const [state] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;
  const { toaster } = useSelector((state) => ({
    toaster: state.toaster,
  }));
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(loadToasterClose(toaster));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={toaster.open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={toaster.severity}>
          {toaster.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
