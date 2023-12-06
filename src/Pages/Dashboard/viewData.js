import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SortTable from "./table";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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

const DataView = (props) => {
  const { open, handleClose, viewType, dataRequest } = props;
  const { t } = useTranslation();
  const { isRtl } = useSelector((state) => ({
    isRtl: state.isRtl,
  }));
  const cityCells = [
    { id: "no", label: t("DASHBOARD_RANKING") },
    { id: "city", label: t("DASHBOARD_CITY") },
    { id: "active_post", label: t("DASHBOARD_ACTIVE_POST") },
    { id: "sold_item", label: t("DASHBOARD_ITEM_SOLD") },
    { id: "users", label: t("DASHBOARD_USERS") },
  ];
  const orderCells = [
    { id: "no", label: t("DASHBOARD_RANKING") },
    { id: "category", label: t("DASHBOARD_LABEL_CATEGORY") },
    { id: "brand", label: t("DASHBOARD_LABEL_BRAND") },
  ];
  const keywordCells = [
    { id: "no", label: t("DASHBOARD_RANKING") },
    { id: "title", label: t("DASHBOARD_LABEL_KEYWORD") },
  ];
  const postCells = [
    { id: "no", label: t("DASHBOARD_RANKING") },
    { id: "category", label: t("DASHBOARD_LABEL_CATEGORY") },
    { id: "brand", label: t("DASHBOARD_LABEL_BRAND") },
  ];

  const handleCloseAction = () => {
    handleClose(false);
  };

  return (
    <Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"md"}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseAction}
        >
          {viewType === "postRanking" && t("DASHBOARD_POST_RANKING")}
          {viewType === "keywordRanking" && t("DASHBOARD_KEYWORD_RANKING")}
          {viewType === "cityRanking" && t("DASHBOARD_CITY_RANKING")}
          {viewType === "orderRanking" && t("DASHBOARD_ORDER_RANKING")}
        </BootstrapDialogTitle>
        {viewType === "postRanking" && (
          <DialogContent dividers>
            <div className="ranking-table-wrapper">
              {dataRequest && dataRequest.length > 0 && (
                <SortTable
                  title={t("DASHBOARD_POST")}
                  headCells={postCells}
                  rows={dataRequest}
                />
              )}
            </div>
          </DialogContent>
        )}
        {viewType === "keywordRanking" && (
          <DialogContent dividers>
            <div className="ranking-table-wrapper">
              {dataRequest && dataRequest.length > 0 && (
                <SortTable
                  title={t("DASHBOARD_LABEL_KEYWORD")}
                  headCells={keywordCells}
                  rows={dataRequest}
                />
              )}
            </div>
          </DialogContent>
        )}
        {viewType === "cityRanking" && (
          <DialogContent dividers>
            <div className="ranking-table-wrapper">
              {dataRequest && dataRequest.length > 0 && (
                <SortTable
                  title={t("DASHBOARD_CITY")}
                  headCells={cityCells}
                  rows={dataRequest}
                />
              )}
            </div>
          </DialogContent>
        )}
        {viewType === "orderRanking" && (
          <DialogContent dividers>
            <div className="ranking-table-wrapper">
              {dataRequest && dataRequest.length > 0 && (
                <SortTable
                  title={t("DASHBOARD_ORDER")}
                  headCells={orderCells}
                  rows={dataRequest}
                />
              )}
            </div>
          </DialogContent>
        )}
      </BootstrapDialog>
    </Fragment>
  );
};

export default DataView;
