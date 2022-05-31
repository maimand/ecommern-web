import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React from "react";
import { Container, Row } from "reactstrap";

import "./Mainlayout.scss";

export default function MainLayout(props) {
  return (
    <>
      <div className="main-layout">
        <Row>
          <Header />
        </Row>

        <Container>
          <div className="row content">{props.children}</div>
        </Container>

        <Row>
          <Footer />
        </Row>
      </div>
    </>
  );
}
