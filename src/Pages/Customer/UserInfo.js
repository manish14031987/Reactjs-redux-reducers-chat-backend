import React, { Fragment } from "react";
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
import { Row, Col } from "react-bootstrap";
import { date } from "../../utils/helpers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from "@material-ui/lab/Rating";
import { useTranslation } from "react-i18next";
import { rtlTheme, ltrTheme } from "../../utils/helpers";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useHistory } from "react-router-dom";
import rtl from "jss-rtl";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const { REACT_APP_CURRENCY, REACT_APP_COUNTRY_CODE, REACT_APP_IMAGE_PATH } =
  process.env;

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

const ViewDetails = (props) => {
  const { open, onHide } = props;
  const { t } = useTranslation();
  const { requestParams, isRtl } = useSelector((state) => ({
    requestParams: state.requestParams,
    isRtl: state.isRtl,
  }));
  const history = useHistory();
  const classes = useStyles();

  const walletClick = () => {
    props.onWallet(requestParams);
  };
  const handleGiftClick = () => {
    history.push(`/coupon/create?id=${requestParams.user._id}`);
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
              {t("DOFFO_BOOST_USER_DETAILS")}
            </BootstrapDialogTitle>

            <DialogContent dividers>
              <Card className={classes.root}>
                <CardContent>
                  <div className="order-detail pl-0 user_detail_popup">
                    <figure className="profile_picture">
                      <img src={requestParams.user.image} alt="user-profile" />
                    </figure>

                    <div className="profile_detail">
                      <strong>
                        {requestParams.user.first_name}&nbsp;
                        {requestParams.user.last_name}
                      </strong>
                      {requestParams.user.doffoStatus && (
                        <small>{t("DOFFO_BOOST_MEMBER")}</small>
                      )}
                      <div className="start_rating">
                        <Rating
                          name="disabled"
                          value={requestParams.user.rating}
                          disabled
                        />
                        ({requestParams.user.totalRating})
                      </div>
                    </div>

                    <div className="feedback-tabs">
                      <h5>{t("DOFFO_BOOST_FEEDBACK")}</h5>
                      <ul>
                        {requestParams.feedBack.map((item, key) => (
                          <li>
                            <span className="feedback_count" key={key}>
                              {item.count}
                            </span>
                            {item.title}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="user_main_detail">
                      <Row>
                        <Col md={6}>
                          <div className="user_detail_block">
                            <div className="user_detail_head gift-item-cs">
                              {t("DOFFO_BOOST_USER_DETAIL_TITLE")}
                              <CardGiftcardIcon onClick={handleGiftClick} />
                            </div>

                            <ul>
                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_USER_PERSONAL_ID")}:
                                </span>
                                {t("DOFFO_BOOST_U")}
                                {requestParams.user.userId}
                              </li>
                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_USER_EMAIL_ID")}:
                                </span>
                                {requestParams.user.email}
                              </li>

                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_MOBILE_NUMBER")}:
                                </span>
                                {REACT_APP_COUNTRY_CODE}-
                                {requestParams.user.mobile_number}
                              </li>

                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_USER_DOB")}:
                                </span>
                                {requestParams.user.dob
                                  ? date(requestParams.user.dob)
                                  : "N/A"}
                              </li>

                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_MEMBER")}:
                                </span>
                                {requestParams.user.doffoStatus
                                  ? t("YES")
                                  : t("NO")}
                              </li>

                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_EMAIL_VERIFIED")}:
                                </span>
                                {requestParams.user.emailVerify
                                  ? t("YES")
                                  : t("NO")}
                              </li>

                              <li>
                                <span className="info_label">
                                  {t("DOOFO_BOOST_PHONE_VERIFIED")}:
                                </span>
                                {requestParams.user.status ? t("YES") : t("NO")}
                              </li>

                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_FACEBOOK_VERIFIED")}:
                                </span>
                                {requestParams.user.fbStatus
                                  ? t("YES")
                                  : t("NO")}
                              </li>
                            </ul>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="wallet_information">
                            <h6 className="wallet-arrow-cs">
                              <span>
                                <img
                                  src={`${REACT_APP_IMAGE_PATH}/static/payment/wallet.png`}
                                  alt=""
                                />
                              </span>
                              {t("DOFFO_BOOST_WALLET_INFORMATION")}

                              <ArrowCircleRightRoundedIcon
                                onClick={walletClick}
                              />
                            </h6>
                            <ul>
                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_WALLET_BALANCE")}:
                                </span>
                                {requestParams.walletAmount}{" "}
                                {REACT_APP_CURRENCY}
                              </li>
                            </ul>
                          </div>

                          <div className="user_detail_block">
                            <div className="user_detail_head">
                              {t("DOFFO_BOOST_BALANCE_DETAILS")}
                            </div>

                            <ul>
                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_TOTAL_PAYOUT")}:
                                </span>
                                {requestParams.totalPayout} {REACT_APP_CURRENCY}
                              </li>

                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_TOTAL_PURCHASE")}:
                                </span>
                                {requestParams.totalPurchase}{" "}
                                {REACT_APP_CURRENCY}
                              </li>

                              <li>
                                <span className="info_label">
                                  {t("DOFFO_BOOST_TOTAL_SPEND")}:
                                </span>
                                {requestParams.boostPurchase}{" "}
                                {REACT_APP_CURRENCY}
                              </li>
                            </ul>
                          </div>
                          {requestParams.user && requestParams.user.bank && (
                            <div className="user_detail_block">
                              <div className="user_detail_head">
                                {t("DOFFO_BOOST_BANK_INFORMATION")}
                              </div>
                              <ul>
                                <li>
                                  <span className="info_label">
                                    {t("DOFFO_BOOST_BANK_NAME")}:
                                  </span>
                                  {requestParams.user.bank.title}
                                </li>
                                <li>
                                  <span className="info_label">
                                    {t("DOFFO_BOOST_ACCOUNT_NUMBER")}:
                                  </span>
                                  {requestParams.user.bank.iban_number}
                                </li>
                              </ul>
                            </div>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogContent>
          </BootstrapDialog>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default ViewDetails;
