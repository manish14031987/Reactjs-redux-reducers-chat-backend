import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@mui/icons-material/Send";
import { useLocation, useHistory } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { loadDialogData } from "../../actions/baseActions";
import * as settingActions from "../../actions/settingActions";
import { security } from "../../actions/settingActions";
import Delete from "../../Component/Delete";
import Search from "../../Component/Table/search";
import { Col, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GRAFF from "../../assets/images/home/graff.png";
import Loader from "../../App/layout/Skeleton";
import SortTable from "./table";
import moment from "moment";
import DateRequest from "./dateChoose";
import ViewDataRequest from "./viewData";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Pie } from "react-chartjs-2";
import { checkPermission } from "../../utils/helpers";
import { SECURITY } from "../../utils/permission";
import VisibilityIcon from "@material-ui/icons/Visibility";
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

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const { title, dashboard, actions } = props;
  const { t } = useTranslation();
  const { dialogOpen, preLoader, superUserInfo, isRtl } = useSelector(
    (state) => ({
      dialogOpen: state.dialogOpen,
      preLoader: state.preLoader,
      superUserInfo: state.superUserInfo,
      isRtl: state.isRtl,
    })
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [dialog, setDialog] = useState({});
  const queryString = require("query-string");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);
    const request = {};

    if (params.get("to")) {
      var to = queryStringParsed["to"];
      request.created_at_to = to;
    }
    if (params.get("from")) {
      var from = queryStringParsed["from"];
      request.created_at_from = from;
    }
    if (params.get("filterType")) {
      var filterType = queryStringParsed["filterType"];
      request.filterType = filterType;
    }
    const fetchData = () => {
      actions.getDashboardData(request);
    };
    fetchData();
    document.title = title;
  }, [actions, title, location, queryString]);

  const handleClickSecurity = (data) => {
    if (data.action) {
      dispatch(security());
    } else {
      data.message = t("DASHBOARD_SECURITY_ALERT_DESCRIPTION");
      data.titleDialog = t("DASHBOARD_SECURITY_ALERT_TITLE");
      data.dialogTitle = t("DASHBOARD_SECURITY_ALERT_TITLE");
      data.open = true;
      setDialog(data);
      dispatch(loadDialogData(true));
    }
  };
  const breadcrumbs = [
    {
      title: t("DASHBOARD"),
      class: "activeBreadcrumbs",
    },
  ];

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
    { id: "title", label: "Keyword" },
  ];
  const postCells = [
    { id: "no", label: t("DASHBOARD_RANKING") },
    { id: "category", label: t("DASHBOARD_LABEL_CATEGORY") },
    { id: "brand", label: t("DASHBOARD_LABEL_BRAND") },
  ];
  const currentDate = moment().format("L");
  const [dateRequest, setDateRequest] = useState({
    statistics: currentDate,
    bootPlan: currentDate,
    order: currentDate,
    report: currentDate,
    post: currentDate,
    user: currentDate,
    postRanking: currentDate,
    keywordRanking: currentDate,
    orderRanking: currentDate,
    cityRanking: currentDate,
    all: currentDate,
  });
  const [filterType, setFilterType] = useState("");
  const [viewType, setViewType] = useState("");
  const [open, setOpen] = useState(false);
  const [viewOpen, setOpenView] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [dataRequest, setDataRequest] = useState([]);

  const chooseDateFilter = (type) => {
    setFilterType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);
    var filterType = queryStringParsed["filterType"];
    var date = "";

    if (params.get("filterSearch")) {
      setShowFilter(true);
    }

    if (params.get("from") && params.get("to")) {
      date = `${queryStringParsed["from"]} To ${queryStringParsed["to"]}`;
    } else if (params.get("from")) {
      date = `${queryStringParsed["from"]}`;
    } else if (params.get("to")) {
      date = `${queryStringParsed["to"]}`;
    }
    if (filterType === "all") {
      if (date)
        setDateRequest({
          statistics: date,
          bootPlan: date,
          order: date,
          report: date,
          post: date,
          user: date,
          postRanking: date,
          keywordRanking: date,
          orderRanking: date,
          cityRanking: date,
          all: date,
        });
    } else {
      if (date)
        setDateRequest({
          ...dateRequest,
          [filterType]: date,
        });
    }
  }, [location, queryString]);

  const handleOnSearchClick = (params) => {
    var date = "";
    if (params.from && params.to) {
      date = `${params.from} To ${params.to}`;
    } else if (params.from) {
      date = `${params.from}`;
    } else {
      date = `${params.to}`;
    }
    setOpen(false);
    if (filterType === "all") {
      setDateRequest({
        statistics: date,
        bootPlan: date,
        order: date,
        report: date,
        post: date,
        user: date,
        postRanking: date,
        keywordRanking: date,
        orderRanking: date,
        cityRanking: date,
        all: date,
      });
    } else {
      setDateRequest({
        ...dateRequest,
        [filterType]: date,
      });
    }

    const requestParams = new URLSearchParams(location.search);
    if (params.from) {
      requestParams.set("from", params.from);
    }
    if (params.to) {
      requestParams.set("to", params.to);
    }
    requestParams.set("filterType", filterType);
    requestParams.set("filterSearch", true);
    history.push({
      pathname: "/dashboard",
      search: "?" + requestParams,
    });
    window.location.reload(false);
  };

  const handleClickResetFilter = () => {
    setShowFilter(false);
    setDateRequest({
      statistics: currentDate,
      bootPlan: currentDate,
      order: currentDate,
      report: currentDate,
      post: currentDate,
      user: currentDate,
      postRanking: currentDate,
      keywordRanking: currentDate,
      orderRanking: currentDate,
      cityRanking: currentDate,
      all: currentDate,
    });
    history.push(`/dashboard`);
  };

  const viewAllData = (type) => {
    const filterRequest = {};
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);
    if (params.get("to")) {
      var to = queryStringParsed["to"];
      filterRequest.created_at_to = to;
    }
    if (params.get("from")) {
      var from = queryStringParsed["from"];
      filterRequest.created_at_from = from;
    }
    filterRequest.type = type;
    setViewType(type);
    actions.getDashboardViewData(filterRequest, viewDataPopUp);
  };

  const viewDataPopUp = (data) => {
    setDataRequest(data);
    setOpenView(true);
  };
  const divStyle = isRtl ? "arabic-rtl" : "eng-ltr";
  return (
    <Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          {preLoader ? (
            <Fragment>
              <Row className="pt-3 dashboard-search-cs">
                <Search Breadcrumb={breadcrumbs} dir={isRtl ? "rtl" : "ltr"} />
              </Row>
              <div className="select-date" dir={isRtl ? "rtl" : "ltr"}>
                <label>Date:</label>
                <span onClick={(e) => chooseDateFilter("all")}>
                  <svg
                    className="MuiSvgIcon-root"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                  </svg>
                  {dateRequest.all}
                </span>
              </div>
              <div className="security_alert" dir={isRtl ? "rtl" : "ltr"}>
                {showFilter && (
                  <Button
                    variant="contained"
                    title={t("DASHBOARD_RESET_FILTER")}
                    onClick={handleClickResetFilter}
                    startIcon={<RefreshIcon fontSize="large" />}
                  >
                    {t("DASHBOARD_RESET_FILTER")}
                  </Button>
                )}
                &nbsp;&nbsp;
                {checkPermission(superUserInfo, SECURITY) && (
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.root,
                      label: classes.label,
                    }}
                    title={t("DASHBOARD_SECURITY_ALERT_TITLE_BUTTON")}
                    onClick={handleClickSecurity}
                    startIcon={<SendIcon fontSize="large" />}
                  >
                    {t("DASHBOARD_SEND_SECURITY_ALERT_BUTTON")}
                  </Button>
                )}
                {dialogOpen && (
                  <Delete
                    dialog={dialog}
                    handleDeleteClick={handleClickSecurity}
                  />
                )}
              </div>

              <div className="admin-dashboard" dir={isRtl ? "rtl" : "ltr"}>
                <div className="dashboard-wrapper">
                  <div className="card custome-card statistics">
                    <div className="card-top">
                      <strong>{t("DASHBOARD_STATICS")}</strong>
                      <div className="select-date">
                        <label>{t("DASHBOARD_DATE")}:</label>
                        <span onClick={(e) => chooseDateFilter("statistics")}>
                          <svg
                            className="MuiSvgIcon-root"
                            focusable="false"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                          </svg>
                          {dateRequest.statistics}
                        </span>
                      </div>
                    </div>

                    <div className="profit-row">
                      {dashboard.profitCount && (
                        <div className="profit-date">
                          <div className="advance-list">
                            <i className="fas fa-chart-line"></i>
                            <div className="advance-list-info">
                              <h5>{t("DASHBOARD_TOTAL_SALE")}</h5>
                              <strong>
                                SR {dashboard.profitCount.totalAmount}
                              </strong>
                            </div>
                          </div>

                          <div className="advance-list">
                            <i className="fas fa-chart-line"></i>
                            <div className="advance-list-info">
                              <h5>{t("DASHBOARD_SELLER_SALES")}</h5>
                              <strong>
                                SR {dashboard.profitCount.sellerCommission}
                              </strong>
                            </div>
                          </div>
                        </div>
                      )}
                      {dashboard.profitCount && (
                        <div className="amount-recived gross-profit">
                          <h4>{t("DASHBOARD_GROSS_PROFIT")}</h4>
                          <strong className="green-text price">
                            SR
                            {(
                              dashboard.profitCount.commission +
                              dashboard.profitCount.totalBoost
                            ).toFixed(2)}
                          </strong>
                          <ul>
                            <li>
                              {t("DASHBOARD_COMMISSION")}
                              <span>
                                SR {dashboard.profitCount.commission.toFixed(2)}
                              </span>
                            </li>
                            <li>
                              {t("DASHBOARD_BOOST")}
                              <span>
                                SR {dashboard.profitCount.totalBoost.toFixed(2)}
                              </span>
                            </li>
                            <li>
                              Ad's<span>SR 0</span>
                            </li>
                          </ul>
                        </div>
                      )}
                      {dashboard.profitCount && (
                        <div className="amount-recived gross-profit">
                          <h4>{t("DASHBOARD_GOODS")}</h4>
                          <strong className="red-text price">
                            SR&nbsp;
                            {Math.round(
                              dashboard.profitCount.shippingFees +
                                dashboard.profitCount.processingFees
                            )}
                          </strong>
                          <ul>
                            <li>
                              {t("DASHBOARD_PROCESSING_FEE")}
                              <span>
                                SR
                                {Math.round(
                                  dashboard.profitCount.processingFees
                                )}
                              </span>
                            </li>
                            <li>
                              {t("DASHBOARD_SHIPPING_FEE")}
                              <span>
                                SR{" "}
                                {Math.round(dashboard.profitCount.shippingFees)}
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <section
                  className="boost-order-report"
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <Row dir={isRtl ? "rtl" : "ltr"}>
                    {dashboard.bootPlanChart && (
                      <Col md={3}>
                        <div className="card custome-card boost">
                          <div className="select-date">
                            <label>{t("DASHBOARD_DATE")}:</label>
                            <span onClick={(e) => chooseDateFilter("bootPlan")}>
                              <svg
                                className="MuiSvgIcon-root"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                              </svg>
                              {dateRequest.bootPlan}
                            </span>
                          </div>
                          <h3 className="card-title">
                            {t("DASHBOARD_BOOST_PLAN")}
                          </h3>
                          <div className="graf-wrapper">
                            <Pie data={dashboard.bootPlanChart} />
                          </div>
                        </div>
                      </Col>
                    )}

                    <Col md={4}>
                      {dashboard.orderCount && (
                        <div className="card custome-card boost">
                          <div className="city-ranking">
                            <h3 className="card-title">
                              {t("DASHBOARD_ORDER")}
                            </h3>
                            <div className="select-date">
                              <label>{t("DASHBOARD_DATE")}:</label>
                              <span onClick={(e) => chooseDateFilter("order")}>
                                <svg
                                  className="MuiSvgIcon-root"
                                  focusable="false"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                                </svg>
                                {dateRequest.order}
                              </span>
                            </div>
                          </div>
                          <div className="order-wrapper">
                            <ul>
                              <li>
                                <i className="fas fa-check-circle green-text"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_COMPLETED")}</small>
                                  <strong>
                                    {dashboard.orderCount.deliveredOrder}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <i className="fas fa-shipping-fast"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_SHIPPING")}</small>
                                  <strong>
                                    {dashboard.orderCount.shippingOrder}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <i className="fas fa-money-bill-alt green-text"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_CASE")}</small>
                                  <strong>
                                    {dashboard.orderCount.cashOrder}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <i className="fas fa-handshake"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_MEET_UP")}</small>
                                  <strong>
                                    {dashboard.orderCount.meetUpOrder}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <i className="far fa-credit-card green-text"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_ONLINE_PAYMENT")}</small>
                                  <strong>
                                    {dashboard.orderCount.onlineOrder}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <i className="fas fa-undo green-text"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_RETURNED")}</small>
                                  <strong>
                                    {dashboard.orderCount.returnOrder}
                                  </strong>
                                </div>
                              </li>
                              <li>
                                <i className="fas fa-shipping-fast green-text"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_ALL")}</small>
                                  <strong>
                                    {dashboard.orderCount.totalOrder}
                                  </strong>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </Col>

                    <Col md={5}>
                      <div className="card custome-card boost">
                        <div className="select-date">
                          <label>{t("DASHBOARD_DATE")}</label>
                          <span onClick={(e) => chooseDateFilter("report")}>
                            <svg
                              className="MuiSvgIcon-root"
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                            </svg>
                            {dateRequest.report}
                          </span>
                        </div>
                        <h3 className="card-title">{t("DASHBOARD_REPORT")}</h3>
                        <div className="graf-wrapper">
                          <img src={GRAFF} alt="graff" />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </section>

                <section className="post-user" dir={isRtl ? "rtl" : "ltr"}>
                  <Row dir={isRtl ? "rtl" : "ltr"}>
                    {dashboard.postCount && (
                      <Col md={6}>
                        <div className="card custome-card boost">
                          <div className="city-ranking">
                            <h3 className="card-title">
                              {t("DASHBOARD_POST")}
                            </h3>
                            <div className="select-date">
                              <label>{t("DASHBOARD_DATE")}:</label>
                              <span onClick={(e) => chooseDateFilter("post")}>
                                <svg
                                  className="MuiSvgIcon-root"
                                  focusable="false"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                                </svg>
                                {dateRequest.post}
                              </span>
                            </div>
                          </div>
                          <div className="order-wrapper">
                            <ul>
                              <li>
                                <i className="fas fa-check-circle green-text"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_ACTIVE")}</small>
                                  <strong>
                                    {dashboard.postCount.activePost}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <i className="fas fa-dollar-sign"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_MARK_AS_SOLD")}</small>
                                  <strong>
                                    {dashboard.postCount.soldPost}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <i className="fas fa-pallet green-text"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_ARCHIVED")}</small>
                                  <strong>
                                    {dashboard.postCount.archivedPost}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <i className="fas fa-plus"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_NEW")}</small>
                                  <strong>
                                    {dashboard.postCount.totalPost}
                                  </strong>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                    )}
                    {dashboard.userCount && (
                      <Col md={6}>
                        <div className="card custome-card boost">
                          <div className="city-ranking">
                            <h3 className="card-title">
                              {t("DASHBOARD_USER")}
                            </h3>
                            <div className="select-date">
                              <label>{t("DASHBOARD_DATE")}:</label>
                              <span onClick={(e) => chooseDateFilter("user")}>
                                <svg
                                  className="MuiSvgIcon-root"
                                  focusable="false"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                                </svg>
                                {dateRequest.user}
                              </span>
                            </div>
                          </div>
                          <div className="order-wrapper">
                            <ul>
                              <li>
                                <div
                                  style={{ width: 40, height: 40 }}
                                  className="process-circle"
                                >
                                  <CircularProgressbar
                                    value={
                                      dashboard.userCount.onlineUserPresent
                                    }
                                    text={`${dashboard.userCount.onlineUserPresent}%`}
                                    strokeWidth={10}
                                    styles={buildStyles({
                                      textColor: "black",
                                      pathColor: "green",
                                    })}
                                  />
                                </div>
                                <div className="order-detail">
                                  <small>Online</small>
                                  <strong>
                                    {dashboard.userCount.onlineUser}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <div
                                  style={{ width: 40, height: 40 }}
                                  className="process-circle"
                                >
                                  <CircularProgressbar
                                    value={
                                      dashboard.userCount.offlineUserPresent
                                    }
                                    text={`${dashboard.userCount.offlineUserPresent}%`}
                                    strokeWidth={10}
                                    styles={buildStyles({
                                      textColor: "black",
                                      pathColor: "red",
                                    })}
                                  />
                                </div>
                                <div className="order-detail">
                                  <small>Offline</small>
                                  <strong>
                                    {dashboard.userCount.offlineUser}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <div
                                  style={{ width: 40, height: 40 }}
                                  className="process-circle"
                                >
                                  <CircularProgressbar
                                    value={
                                      dashboard.userCount.deactivateUserPresent
                                    }
                                    text={`${dashboard.userCount.deactivateUserPresent}%`}
                                    strokeWidth={10}
                                    styles={buildStyles({
                                      textColor: "black",
                                      pathColor: "yellow",
                                    })}
                                  />
                                </div>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_BANNED")}</small>
                                  <strong>
                                    {dashboard.userCount.deactivateUser}
                                  </strong>
                                </div>
                              </li>

                              <li>
                                <i className="fas fa-plus"></i>
                                <div className="order-detail">
                                  <small>{t("DASHBOARD_NEW")}</small>
                                  <strong>{dashboard.userCount.allUser}</strong>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                    )}
                  </Row>
                </section>

                <section className="post-user" dir={isRtl ? "rtl" : "ltr"}>
                  <Row dir={isRtl ? "rtl" : "ltr"}>
                    {dashboard.postRanking && dashboard.postRanking.length > 0 && (
                      <Col md={6}>
                        <div className="card custome-card boost">
                          <div className="city-ranking">
                            <h3
                              className="card-title viewItem"
                              onClick={() => viewAllData("postRanking")}
                            >
                              {t("DASHBOARD_POST_RANKING")} <VisibilityIcon />
                            </h3>

                            <div className="select-date">
                              <label>{t("DASHBOARD_DATE")}:</label>
                              <span
                                onClick={(e) => chooseDateFilter("postRanking")}
                              >
                                <svg
                                  className="MuiSvgIcon-root"
                                  focusable="false"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                                </svg>
                                {dateRequest.postRanking}
                              </span>
                            </div>
                          </div>
                          <div className="ranking-table-wrapper">
                            {dashboard.postRanking &&
                              dashboard.postRanking.length > 0 && (
                                <SortTable
                                  title="post"
                                  headCells={postCells}
                                  rows={dashboard.postRanking}
                                />
                              )}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dashboard.keyRanking && dashboard.keyRanking.length > 0 && (
                      <Col md={6}>
                        <div className="card custome-card boost">
                          <div className="city-ranking">
                            <h3
                              className="card-title viewItem"
                              onClick={() => viewAllData("keywordRanking")}
                            >
                              {t("DASHBOARD_KEYWORD_RANKING")}{" "}
                              <VisibilityIcon />
                            </h3>
                            <div className="select-date">
                              <label>{t("DASHBOARD_DATE")}:</label>
                              <span
                                onClick={(e) =>
                                  chooseDateFilter("keywordRanking")
                                }
                              >
                                <svg
                                  className="MuiSvgIcon-root"
                                  focusable="false"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                                </svg>
                                {dateRequest.keywordRanking}
                              </span>
                            </div>
                          </div>
                          <div className="ranking-table-wrapper">
                            {dashboard.keyRanking &&
                              dashboard.keyRanking.length > 0 && (
                                <SortTable
                                  title="keyword"
                                  headCells={keywordCells}
                                  rows={dashboard.keyRanking}
                                />
                              )}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dashboard.cityData && dashboard.cityData.length > 0 && (
                      <Col md={6}>
                        <div className="card custome-card boost">
                          <div className="city-ranking">
                            <h3
                              className="card-title viewItem"
                              onClick={() => viewAllData("cityRanking")}
                            >
                              {t("DASHBOARD_CITY_RANKING")} <VisibilityIcon />
                            </h3>
                            <div className="select-date">
                              <label>{t("DASHBOARD_DATE")}:</label>
                              <span
                                onClick={(e) => chooseDateFilter("cityRanking")}
                              >
                                <svg
                                  className="MuiSvgIcon-root"
                                  focusable="false"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                                </svg>
                                {dateRequest.cityRanking}
                              </span>
                            </div>
                          </div>
                          <div className="ranking-table-wrapper">
                            {dashboard.cityData &&
                              dashboard.cityData.length > 0 && (
                                <SortTable
                                  title="city"
                                  headCells={cityCells}
                                  rows={dashboard.cityData}
                                />
                              )}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dashboard.orderRanking &&
                      dashboard.orderRanking.length > 0 && (
                        <Col md={6}>
                          <div className="card custome-card boost">
                            <div className="city-ranking">
                              <h3
                                className="card-title viewItem"
                                onClick={() => viewAllData("orderRanking")}
                              >
                                {t("DASHBOARD_ORDER_RANKING")}{" "}
                                <VisibilityIcon />
                              </h3>
                              <div className="select-date">
                                <label>{t("DASHBOARD_DATE")}:</label>
                                <span
                                  onClick={(e) =>
                                    chooseDateFilter("orderRanking")
                                  }
                                >
                                  <svg
                                    className="MuiSvgIcon-root"
                                    focusable="false"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
                                  </svg>
                                  {dateRequest.orderRanking}
                                </span>
                              </div>
                            </div>
                            <div className="ranking-table-wrapper">
                              {dashboard.orderRanking &&
                                dashboard.orderRanking.length > 0 && (
                                  <SortTable
                                    title="order"
                                    headCells={orderCells}
                                    rows={dashboard.orderRanking}
                                  />
                                )}
                            </div>
                          </div>
                        </Col>
                      )}
                  </Row>
                </section>
              </div>
              {open && (
                <DateRequest
                  open={open}
                  filterType={filterType}
                  handleClose={handleClose}
                  onSearch={handleOnSearchClick}
                />
              )}
              {viewOpen && (
                <ViewDataRequest
                  open={viewOpen}
                  viewType={viewType}
                  dataRequest={dataRequest}
                  handleClose={setOpenView}
                />
              )}
            </Fragment>
          ) : (
            <Loader />
          )}
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(settingActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
