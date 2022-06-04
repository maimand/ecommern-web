import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React from "react";
import { Col, Container, Row } from "reactstrap";

import "./Mainlayout.scss";

export default function MainLayout(props) {
  return (
    <>
      <div className="main-layout">
        <Row>
          <Header />
        </Row>
        <Container>
          <Row>
            <Col style={{ zIndex: "-1" }} className="content">
              {props.children}
            </Col>
          </Row>
        </Container>
        <Row>
          <Footer />
        </Row>
      </div>
    </>
  );
}
