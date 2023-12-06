import React, { useEffect } from "react";
import Aux from "../../hoc/_Aux";
import { Row, Col, Card } from "react-bootstrap";
import ActiveBreadcrumb from "../../Component/ActiveBreadcrumb";
import Form from "./form";

const Index = (props) => {
  const { title } = props;
  useEffect(() => {
    document.title = title;
  });
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
    <>
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
                  Fields marked with * are mandatory.
                </span>
              </Card.Header>
              <Card.Body>
                <Form item={{}} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    </>
  );
};

export default Index;
