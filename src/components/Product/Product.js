import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle
} from "reactstrap";

import "./Product.scss";

export default function Product() {
  const [addCart, setAddCart] = useState(false);

  const onAddCart = () => {
    if (!addCart) {
      setAddCart(true);
    }
  };

  return (
    <div className="card-wrapper">
      <Card className="card-wrapper-content">
        <CardImg
          alt="Card image cap"
          src="https://picsum.photos/318/180"
          top
          width="100%"
          className="card-img"
        />
        <CardBody>
          <CardTitle className="text-center" tag="h5">
            Product Name
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
            100 $
          </CardSubtitle>
          <CardText>asafdaaaaaaaaaaaaaaaaaaaaassa</CardText>
          <div
            style={{ width: "100%" }}
            className="d-flex justify-content-center"
          >
            <button
              className="btn btn-block btn-success"
              type="submit"
              onClick={onAddCart}
            >
              {!addCart ? "Add To Cart" : "Go To Cart"}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
