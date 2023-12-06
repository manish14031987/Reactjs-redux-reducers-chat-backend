import React, { useEffect, Fragment } from "react";
import Aux from "../../hoc/_Aux";
import { Row, Col, Card } from "react-bootstrap";
import ActiveBreadcrumb from "../../Component/ActiveBreadcrumb";
import Form from "./form";
import { useSelector } from "react-redux";
const Index = (props) => {
  const { title } = props;
  useEffect(() => {
    document.title = title;
  });
  const { requestParams } = useSelector((state) => ({
    requestParams: state.requestParams,
  }));
  const breadcrumbs = [
    {
      title: "Sub admin Management",
      action: "/sub-admin",
    },
    {
      title: title,
      class: "activeBreadcrumbs",
    },
  ];
  return (
    <Fragment>
      <Aux>
        <Row>
          <Col>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Header>
                    <Card.Title as="h5">
                      <ActiveBreadcrumb breadcrumb={breadcrumbs} />
                    </Card.Title>
                    <br />
                    <span className="redHint">
                      Fields marked with * are mandatory.
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
    </Fragment>
  );
};

export default Index;
