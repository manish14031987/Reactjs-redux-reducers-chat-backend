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
import { checkPermission } from "../../utils/helpers";
import { subAdminCreate } from "../../utils/permission";
import {
  loadData,
  updateSubAdmin,
  deleteSubAdmin,
  getDepartment,
} from "../../actions/subAdminActions";
import {
  loadTableHeader,
  loadRequestData,
  loadDialogData,
} from "../../actions/baseActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../App/layout/Skeleton";
const queryString = require("query-string");

const Index = (props) => {
  const { title } = props;
  const { isData, subAdminData, dialogOpen, preLoader, superUserInfo } =
    useSelector((state) => ({
      isData: state.isData,
      subAdminData: state.subAdminData,
      dialogOpen: state.dialogOpen,
      preLoader: state.preLoader,
      superUserInfo: state.superUserInfo,
    }));
  const tableHead = [
    {
      title: "Name",
      key: "first_name",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=first_name&direction=asc",
      desc: "sort=first_name&direction=desc",
    },
    {
      title: "Email",
      key: "email",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=email&direction=asc",
      desc: "sort=email&direction=desc",
    },
    {
      title: "Created At",
      key: "created_at",
      type: "date",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=created_at&direction=asc",
      desc: "sort=created_at&direction=desc",
    },
  ];
  const breadcrumbs = [
    {
      title: title,
      class: "activeBreadcrumbs",
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
    dispatch(getDepartment());
  }, [title, dispatch, location]);

  useEffect(() => {
    dispatch(loadTableHeader(list));
  }, [list, dispatch]);

  const handleFormClick = (item) => {
    if (item._id) {
      dispatch(loadRequestData(item));
      history.push(`/sub-admin/edit/${item._id}`);
    } else {
      dispatch(loadRequestData(item));
      history.push(`/sub-admin/create`);
    }
  };
  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/sub-admin`);
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
      pathname: "/sub-admin",
      search: "?" + params,
    });
  };
  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/sub-admin",
      search: "?" + params,
    });
  };
  const handleSwitchClick = (data) => {
    dispatch(updateSubAdmin(data));
  };
  const handlePasswordClick = (item) => {
    dispatch(loadRequestData(item));
    history.push(`/sub-admin/change-password/${item._id}`);
  };

  const handleDeleteClick = (data) => {
    data.message = "Are you sure, you want to delete ";
    data.titleDialog = `${data.first_name} ${data.last_name}`;
    data.dialogTitle = "Delete admin";
    data.open = true;
    setDialog(data);
    dispatch(loadDialogData(true));
  };

  const handleDeleteClickAction = (data) => {
    dispatch(deleteSubAdmin(data._id));
  };

  return (
    <Fragment>
      {preLoader ? (
        <Fragment>
          {isData ? (
            <Fragment>
              <SetValue list={list} />
              <Aux>
                <Row className="pt-3">
                  <Search
                    onClick={resetPage}
                    onSearch={searchData}
                    date={true}
                    show={checkPermission(superUserInfo, subAdminCreate)}
                    status={true}
                    title={"Search by Name / Email / Mobile Number"}
                    handleFormClick={handleFormClick}
                    buttonTitle="sub admin"
                    Breadcrumb={breadcrumbs}
                  />
                </Row>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body className="card code-table">
                        {subAdminData.length > 0 && (
                          <Paginate onClick={handlePageClick} />
                        )}

                        {subAdminData.length > 0 ? (
                          <Table responsive>
                            <Thead title={"sub-admin"} />
                            <tbody>
                              {subAdminData &&
                                subAdminData.map((item, key) => (
                                  <List
                                    item={item}
                                    key={key}
                                    handleFormClick={handleFormClick}
                                    handleSwitchClick={handleSwitchClick}
                                    handlePasswordClick={handlePasswordClick}
                                    handleDeleteClick={handleDeleteClick}
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
                  handleDeleteClick={handleDeleteClickAction}
                />
              )}
            </Fragment>
          ) : (
            <NotLoad
              show={checkPermission(superUserInfo, subAdminCreate)}
              handleFormClick={handleFormClick}
              buttonTitle={"Sub Admin"}
            />
          )}
        </Fragment>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Index;
