import React, { useEffect, useState, Fragment } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Aux from "../../hoc/_Aux";
import { Row, Col, Card, Table } from "react-bootstrap";
import Search from "../../Component/Table/search";
import NotFound from "../../Component/Table/NotFound";
import NotLoad from "../../Component/Table/NotLoad";
import Thead from "../../Component/Table/thead";
import SetValue from "../../Component/Table/setValue";
import Paginate from "../../Component/Table/Paginate";
import List from "./list";
import Delete from "../../Component/Delete";
import ViewDetails from "./UserInfo";
import WalletDetails from "./WalletDetails";
import UserNotes from "./userNotes";

import {
  loadData,
  updateCustomerData,
  deleteCustomerData,
  getUserProfile,
  getWalletData,
  security,
} from "../../actions/customerActions";
import {
  loadTableHeader,
  loadRequestData,
  loadDialogData,
} from "../../actions/baseActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../App/layout/Skeleton";
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
const queryString = require("query-string");

const Index = (props) => {
  const { title } = props;
  const { t } = useTranslation();
  const { isData, customerData, dialogOpen, preLoader, isRtl } = useSelector(
    (state) => ({
      isData: state.isData,
      customerData: state.customerData,
      dialogOpen: state.dialogOpen,
      preLoader: state.preLoader,
      isRtl: state.isRtl,
    })
  );
  const breadcrumbs = [
    { title: t("USER_MANAGEMENT") },
    {
      title: t("CUSTOMER_MANAGEMENT"),
      class: "activeBreadcrumbs",
    },
  ];
  const tableHead = [
    {
      title: t("CUSTOMER_HEAD_TITLE"),
      key: "first_name",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=first_name&direction=asc",
      desc: "sort=first_name&direction=desc",
    },
    {
      title: t("CUSTOMER_USER_ID"),
      key: "_id",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=_id&direction=asc",
      desc: "sort=_id&direction=desc",
    },
    {
      title: t("CUSTOMER_HEAD_EMAIL"),
      key: "email",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=email&direction=asc",
      desc: "sort=email&direction=desc",
    },
    {
      title: t("CUSTOMER_HEAD_MOBILE_NUMBER"),
      key: "mobile_number",
      type: "number",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=number&direction=asc",
      desc: "sort=number&direction=desc",
    },
    {
      title: t("CUSTOMER_HEAD_DOB"),
      key: "dob",
      type: "date",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=dob&direction=asc",
      desc: "sort=dob&direction=desc",
    },
    {
      title: t("CUSTOMER_HEAD_REGISTRATION_DATE"),
      key: "created_at",
      type: "date",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=created_at&direction=asc",
      desc: "sort=created_at&direction=desc",
    },
    {
      title: t("CUSTOMER_HEAD_STATUS"),
      key: "status",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=status&direction=asc",
      desc: "sort=status&direction=desc",
    },
  ];
  const [dialog, setDialog] = useState({});
  const [list] = useState(tableHead);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);
    const request = {};
    if (params.get("sort")) {
      var sort = queryStringParsed["sort"];
      var direction = queryStringParsed["direction"];
      request.sort = sort;
      request.direction = direction;
    }
    if (params.get("page")) {
      var page = queryStringParsed["page"];
      request.page = page;
    }
    if (params.get("keyword")) {
      var keyword = queryStringParsed["keyword"];
      request.keyword = keyword;
    }
    if (params.get("to")) {
      var to = queryStringParsed["to"];
      request.created_at_to = to;
    }
    if (params.get("from")) {
      var from = queryStringParsed["from"];
      request.created_at_from = from;
    }

    if (params.get("status")) {
      var status = queryStringParsed["status"];
      request.status = status;
    }
    document.title = title;
    dispatch(loadData(request));
  }, [title, dispatch, location]);

  useEffect(() => {
    dispatch(loadTableHeader(list));
  }, [list, dispatch]);

  const handleFormClick = (item) => {
    if (item._id) {
      dispatch(loadRequestData(item));
      history.push(`/users/customer/edit/${item._id}`);
    } else {
      dispatch(loadRequestData(item));
      history.push(`/users/customer/create`);
    }
  };
  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/users/customer`);
  };

  const searchData = (data) => {
    const params = new URLSearchParams(location.search);
    params.delete("page");
    if (parseInt(data.status) === 3) {
      params.delete("status");
    }
    if (data.keyword) {
      params.set("keyword", data.keyword);
    }
    if (data.from) {
      params.set("from", data.from);
    }
    if (data.to) {
      params.set("to", data.to);
    }
    if (data.status) {
      if (parseInt(data.status) === 3) {
        params.delete("status");
      }
      if (parseInt(data.status) !== 3) {
        params.set("status", data.status);
      }
    }
    if (data.search) {
      params.set("search", true);
    }
    history.push({
      pathname: "/users/customer",
      search: "?" + params,
    });
  };
  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/users/customer",
      search: "?" + params,
    });
  };
  const handleSwitchClick = (data) => {
    dispatch(updateCustomerData(data));
  };
  const handlePasswordClick = (item) => {
    dispatch(loadRequestData(item));
    history.push(`/users/customer/change-password/${item._id}`);
  };
  const [modalShow, setModalShow] = useState(false);
  const [walletModalShow, setWalletModalShow] = useState(false);

  const handleViewClick = (item) => {
    var request = {};
    request.id = item._id;
    dispatch(getUserProfile(request, setEditData));
  };

  const setEditData = (item) => {
    dispatch(loadRequestData(item));
    setModalShow(true);
  };

  const handleModalClick = () => {
    setModalShow(false);
  };

  const handleWalletModalClick = () => {
    setWalletModalShow(false);
  };

  const handleDeleteClick = (data) => {
    data.message = t("CUSTOMER_DELETE_DESCRIPTION");
    data.titleDialog = `${data.first_name} ${data.last_name}`;
    data.dialogTitle = t("CUSTOMER_DELETE_TITLE");
    data.open = true;
    data.type = "DELETE";
    setDialog(data);
    dispatch(loadDialogData(true));
  };

  const handleDeleteAction = (data) => {
    if (data.type === "PASSWORD") {
      dispatch(security(data._id));
    } else {
      dispatch(deleteCustomerData(data._id));
    }
  };
  const [getWalletUser, setWalletUser] = useState({});
  const handleViewWalletClick = (data) => {
    setWalletUser(data);
    var request = {};
    request.id = data._id;
    dispatch(getWalletData(request, setWalletData));
  };

  const onWallet = (item) => {
    var request = {};
    request.id = item.user._id;
    dispatch(getWalletData(request, setWalletData));
    setModalShow(false);
  };

  const setWalletData = (item) => {
    dispatch(loadRequestData(item));
    setWalletModalShow(true);
  };

  const handleClickSecurity = (data) => {
    data.message = t("CUSTOMER_PASSWORD_LINK_DESCRIPTION");
    data.titleDialog = `${data.first_name} ${data.last_name}`;
    data.dialogTitle = t("CUSTOMER_RESET_PASSWORD_LINK");
    data.open = true;
    data.type = "PASSWORD";
    setDialog(data);
    dispatch(loadDialogData(true));
  };

  const [userNotesGet, setUserNotes] = useState(false);
  const [getNottesData, setNotesData] = useState({});
  const handleViewUserNotes = (data) => {
    setNotesData(data);
    setUserNotes(true);
  };
  const handleNotesModelClose = () => {
    setUserNotes(false);
  };
  const divStyle = isRtl ? "arabic-rtl" : "eng-ltr";

  return (
    <Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          {preLoader ? (
            <Fragment>
              {isData ? (
                <Fragment>
                  <SetValue list={list} />
                  <Aux>
                    <Row className="pt-3" dir={isRtl ? "rtl" : "ltr"}>
                      <Search
                        onClick={resetPage}
                        onSearch={searchData}
                        date={true}
                        show={true}
                        status={true}
                        title={t("CUSTOMER_SEARCH_TITLE")}
                        handleFormClick={handleFormClick}
                        buttonTitle={t("CUSTOMER_BUTTON_TITLE")}
                        Breadcrumb={breadcrumbs}
                      />
                    </Row>
                    <Row>
                      <Col>
                        <Card>
                          <Card.Body className="card code-table">
                            {customerData.length > 0 && (
                              <Paginate onClick={handlePageClick} />
                            )}

                            {customerData.length > 0 ? (
                              <Table
                                responsive
                                dir={isRtl ? "rtl" : "ltr"}
                                className={divStyle}
                              >
                                <Thead title={"users/customer"} />
                                <tbody>
                                  {customerData &&
                                    customerData.map((item, key) => (
                                      <List
                                        item={item}
                                        key={key}
                                        handleFormClick={handleFormClick}
                                        handleSwitchClick={handleSwitchClick}
                                        handlePasswordClick={
                                          handlePasswordClick
                                        }
                                        handleViewClick={handleViewClick}
                                        handleDeleteClick={handleDeleteClick}
                                        handleViewWalletClick={
                                          handleViewWalletClick
                                        }
                                        handleClickSecurity={
                                          handleClickSecurity
                                        }
                                        handleViewUserNotes={
                                          handleViewUserNotes
                                        }
                                      />
                                    ))}
                                </tbody>
                              </Table>
                            ) : (
                              <NotFound />
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Aux>
                  {dialogOpen && (
                    <Delete
                      dialog={dialog}
                      handleDeleteClick={handleDeleteAction}
                    />
                  )}
                </Fragment>
              ) : (
                <NotLoad
                  show={true}
                  handleFormClick={handleFormClick}
                  buttonTitle={t("CUSTOMER_BUTTON_TITLE")}
                />
              )}

              {modalShow && (
                <ViewDetails
                  open={modalShow}
                  onHide={handleModalClick}
                  onWallet={onWallet}
                />
              )}

              {walletModalShow && (
                <WalletDetails
                  open={walletModalShow}
                  userData={getWalletUser}
                  onHide={handleWalletModalClick}
                />
              )}
              {userNotesGet && (
                <UserNotes
                  open={userNotesGet}
                  userData={getNottesData}
                  onHide={handleNotesModelClose}
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

export default Index;
