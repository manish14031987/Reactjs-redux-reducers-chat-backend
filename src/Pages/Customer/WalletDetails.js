import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Table } from "react-bootstrap";
import { date } from "../../utils/helpers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTranslation } from "react-i18next";
import { rtlTheme, ltrTheme } from "../../utils/helpers";
import Button from "@material-ui/core/Button";
import AddWallet from "./addWallet";
import rtl from "jss-rtl";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const { REACT_APP_CURRENCY } = process.env;

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

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const WalletDetails = (props) => {
  const { open, onHide, userData } = props;
  const { t } = useTranslation();
  const { requestParams, isRtl } = useSelector((state) => ({
    requestParams: state.requestParams,
    isRtl: state.isRtl,
  }));

  const classes = useStyles();

  const [getWalletAdd, setWalletAdd] = useState(false);

  const handleClickAddWallet = () => {
    setWalletAdd(true);
  };

  const handleWalletAddHide = () => {
    setWalletAdd(false);
  };

  return (
    <Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth={true}
            maxWidth={"lg"}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={() => onHide(false)}
            >
              {t("CUSTOMER_WALLET_DETAILS")}
            </BootstrapDialogTitle>

            <DialogContent dividers>
              <Card className={classes.root}>
                <CardContent className="balance_value wallet-bal-cs">
                  <div className="amount-div-cs">
                    {requestParams.totalAmount}
                    <small>{REACT_APP_CURRENCY}</small>
                    <span>{t("CUSTOMER_TOTAL_BALANCE")}</span>
                  </div>
                  <div>
                    <span>
                      <Button
                        variant="contained"
                        className="wallet-balance-add-cs"
                        color="primary"
                        onClick={handleClickAddWallet}
                      >
                        <AddCircleIcon />
                        &nbsp;Add
                      </Button>
                    </span>
                  </div>
                </CardContent>
                <CardContent>
                  {requestParams.data.length > 0 && requestParams.data && (
                    <Table striped hover responsive>
                      <thead>
                        <tr>
                          <th>{t("CUSTOMER_WALLET_DATE")}</th>
                          <th>{t("CUSTOMER_WALLET_AMOUNT")}</th>
                          <th>{t("CUSTOMER_WALLET_TYPE")}</th>
                          <th>{t("CUSTOMER_WALLET_DESCRIPTION")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requestParams.data.map((item, key) => (
                          <tr key={key}>
                            <td>{date(item.created_at)}</td>
                            <td>
                              {REACT_APP_CURRENCY}&nbsp;
                              {item.amount.toFixed(2)}
                            </td>
                            <td>{item.type}</td>
                            <td>{item.remark}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </DialogContent>
          </BootstrapDialog>
          {getWalletAdd && (
            <AddWallet
              open={getWalletAdd}
              userData={userData}
              onHide={handleWalletAddHide}
            />
          )}
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default WalletDetails;
