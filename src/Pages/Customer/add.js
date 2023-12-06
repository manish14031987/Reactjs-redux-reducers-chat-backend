import React, { useEffect } from "react";
import Aux from "../../hoc/_Aux";
import { Row, Col, Card } from "react-bootstrap";
import Form from "./form";
import { useSelector } from "react-redux";
import ActiveBreadcrumb from "../../Component/ActiveBreadcrumb";
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
const Index = (props) => {
  const { title } = props;
  const { t } = useTranslation();
  useEffect(() => {
    document.title = title;
  });
  const { isRtl } = useSelector((state) => ({
    isRtl: state.isRtl,
  }));
  const breadcrumbs = [
    { title: t("USER_MANAGEMENT") },
    {
      title: t("CUSTOMER_MANAGEMENT"),
      action: "/users/customer",
    },
    {
      title: t("CUSTOMER_CREATE"),
      class: "activeBreadcrumbs",
    },
  ];
  return (
    <>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <Aux>
            <Row>
              <Col>
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
                    <Form item={{}} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Aux>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

export default Index;
