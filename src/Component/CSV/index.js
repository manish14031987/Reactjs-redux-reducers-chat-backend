import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DropzoneArea } from "material-ui-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../actions/pageActions";

import { useTranslation } from "react-i18next";
import { rtlTheme, ltrTheme } from "../../utils/helpers";
import rtl from "jss-rtl";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const View = (props) => {
  const { open, handleClose, type } = props;
  const { t } = useTranslation();
  const { isRtl } = useSelector((state) => ({
    isRtl: state.isRtl,
  }));
  const dispatch = useDispatch();
  const handleCloseAction = () => {
    handleClose(false);
  };

  const onChangePicture = (files) => {
    if (files.length > 0) {
      handleClose(false);
      var selectedFile = files[0];
      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);
      formData.append("type", type);
      dispatch(uploadFile(formData, handleClose));
    }
  };

  return (
    <Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth={true}
            maxWidth={"sm"}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleCloseAction}
            >
              {t("CATEGORY_UPLOAD_CSV_TITLE")}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <DropzoneArea
                onChange={onChangePicture}
                acceptedFiles={[".csv", ".xls", ".xlsx"]}
                dropzoneText={t("CATEGORY_CSV_FILE_SIZE_REQUIRED")}
                filesLimit={1}
                getDropRejectMessage={(fileObj) => {
                  if (fileObj.size > 10485760) {
                    return `${t("CATEGORY_FILE")} ${fileObj.name} ${t(
                      "CATEGORY_UPLOAD_CSV_REJECT"
                    )}`;
                  } else if (
                    fileObj.type !== "image/jpeg" ||
                    fileObj.type !== "image/png"
                  ) {
                    return `${t("CATEGORY_FILE")} ${fileObj.name} ${t(
                      "CATEGORY_UPLOAD_CSV_NOT_SUPPORTED"
                    )}`;
                  }
                }}
                alertSnackbarProps={{
                  anchorOrigin: {
                    horizontal: "right",
                    vertical: "top",
                  },
                }}
                maxFileSize={10485760}
              />
            </DialogContent>
          </BootstrapDialog>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default View;
