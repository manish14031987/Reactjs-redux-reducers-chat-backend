import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { loadDialogData } from "../../actions/baseActions";
import { toUcFirst } from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";

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

export default function AlertDialog(props) {
  console.log("DataProps", props);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { dialog, open } = props;
  const { dialogOpen } = useSelector((state) => ({
    dialogOpen: state.dialogOpen,
  }));

  const handleDialogHides = () => {
    props.onHide(false);
  };

  const handleDialogSubmit = () => {
    //props.handleSecurityAction(dialog);
  };

  return (
    <div>
      <Dialog open={true} fullWidth={true} maxWidth={"xs"}>
        <DialogActions className="pr-3">
          <Button
            onClick={handleDialogSubmit()}
            color="primary"
            autoFocus
            variant="contained"
            classes={{
              root: classes.root,
              label: classes.label,
            }}
          >
            Yes
          </Button>
          <Button onClick={handleDialogHides()} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
