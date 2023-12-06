import React, { useEffect, Fragment } from "react";
import Aux from "../../hoc/_Aux";
import { Row, Col, Card } from "react-bootstrap";
import Form from "./form";
import { useSelector, useDispatch } from "react-redux";
import ActiveBreadcrumb from "../../Component/ActiveBreadcrumb";
import { loadRequestData } from "../../actions/baseActions";
import { useTranslation } from "react-i18next";
import { rtlTheme, ltrTheme } from "../../utils/helpers";
import SwitchUser from "./switchUser";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { logo } from "../../assets/images/index";
import rtl from "jss-rtl";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
import { updateUserStatus } from "../../actions/customerActions";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const Index = (props) => {
  const { title } = props;
  const { t } = useTranslation();
  useEffect(() => {
    document.title = title;
  });
  const { requestParams, isRtl } = useSelector((state) => ({
    requestParams: state.requestParams,
    isRtl: state.isRtl,
  }));

  const breadcrumbs = [
    { title: t("USER_MANAGEMENT") },
    {
      title: t("CUSTOMER_MANAGEMENT"),
      action: "/users/customer",
    },
    {
      title: t("CUSTOMER_UPDATE"),
      class: "activeBreadcrumbs",
    },
  ];
  const dispatch = useDispatch();
  const handleChange = (params) => {
    var obj = {
      ...requestParams,
      [params.type]: params.status,
    };
    dispatch(loadRequestData(obj));
    dispatch(updateUserStatus(obj));
  };
  return (
    <Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <Aux>
            <Row>
              <Col>
                <Row>
                  <Col md={3}>
                    <Card>
                      <div className="card-block">
                        <div className="text-center project-main">
                          <figure>
                            <img
                              className="img-fluid rounded-circle"
                              src={requestParams.image}
                              alt="dashboard-user"
                            />
                          </figure>
                          <h5 className="mt-4">
                            {requestParams.first_name.charAt(0).toUpperCase() +
                              requestParams.first_name.slice(1) +
                              " " +
                              requestParams.last_name.charAt(0).toUpperCase() +
                              requestParams.last_name.slice(1)}
                          </h5>
                          {requestParams.last_login_at && (
                            <span className="d-block">
                              {t("CUSTOMER_LAST_LOGIN")}
                            </span>
                          )}
                          {requestParams.last_login_at && (
                            <span className="d-block">
                              {requestParams.last_login_at}
                            </span>
                          )}
                        </div>
                        <div className="doffo-switch-cs">
                          <FacebookIcon className="fbswitch" />{" "}
                          <SwitchUser
                            item={requestParams}
                            type="fbStatus"
                            status={requestParams.fbStatus}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="doffo-switch-cs">
                          <img
                            src={logo}
                            alt="logo"
                            className="doffo-switch-logo"
                          />{" "}
                          <SwitchUser
                            item={requestParams}
                            type="doffoStatus"
                            status={requestParams.doffoStatus}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="doffo-switch-cs">
                          <EmailOutlinedIcon className="email-switch" />{" "}
                          <SwitchUser
                            item={requestParams}
                            type="emailVerify"
                            status={requestParams.emailVerify}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="doffo-switch-cs">
                          <PhoneAndroidIcon className="phone-switch" />{" "}
                          <SwitchUser
                            item={requestParams}
                            status={requestParams.otpVerify}
                            type="otpVerify"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col md={9}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">
                          <ActiveBreadcrumb breadcrumb={breadcrumbs} />
                        </Card.Title>
                        <br />
                        <span className="redHint">
                          {t("FIELDS_MARK_MANDATORY")}
                        </span>
                      </Card.Header>
                      <Card.Body>
                        <Form item={requestParams} />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Aux>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default Index;
