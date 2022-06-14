import Footer from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import React from "react";
import { Container } from "reactstrap";

import "./Mainlayout.scss";

export default function MainLayout(props) {
  return (
    <>
      <div className="main-layout">
        <Header />
        <Container>
          <div className="content">{props.children}</div>
        </Container>
        <Footer />
      </div>
    </>
  );
}
