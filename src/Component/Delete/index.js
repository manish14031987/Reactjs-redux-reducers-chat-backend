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
  const dispatch = useDispatch();
  const classes = useStyles();
  const { dialog } = props;
  const { dialogOpen } = useSelector((state) => ({
    dialogOpen: state.dialogOpen,
  }));

  const handleClose = (action) => {
    dispatch(loadDialogData(false));
    if (action) {
      dialog.action = true;
      props.handleDeleteClick(dialog);
    }
  };
  console.log("DELETE", dialogOpen);
  return (
    <div>
      <Dialog open={dialogOpen} fullWidth={true} maxWidth={"xs"}>
        <DialogTitle id="alert-dialog-title">{dialog.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialog.message}
            {dialog.titleDialog && (
              <Fragment>
                "<b>{toUcFirst(dialog.titleDialog)}</b>"
              </Fragment>
            )}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pr-3">
          <Button
            onClick={() => handleClose(true)}
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
          <Button onClick={() => handleClose(false)} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
