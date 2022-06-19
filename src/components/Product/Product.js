import { USER_ROLE } from "core/constants";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle
} from "reactstrap";

import "./Product.scss";

export default function Product(props) {
  const history = useHistory();
  const userRole = JSON.parse(localStorage.getItem("user"));
  const [addCart, setAddCart] = useState(false);
  const productInfo = props.productInfo;

  const handleActionWithRole = () => {
    return userRole?.role === USER_ROLE.MERCHANT
      ? updateProduct(productInfo?._id)
      : onAddCart();
  };

  const onAddCart = () => {
    if (!addCart) {
      return setAddCart(true);
    }
  };

  const updateProduct = (id) => {
    return history.push(`/update-product-merchant/${id}`);
  };

  const backgroundCSS = productInfo?.isActive ? "#079ad0" : "#e20303";

  return (
    <div className="card-wrapper">
      <Card className="card-wrapper-content position-relative">
        <span
          className="position-absolute"
          style={{
            top: "2px",
            right: "2px",
            backgroundColor: backgroundCSS,
            padding: "3px 3px",
            borderRadius: "10px",
            textAlign: "center",
            color: "white"
          }}
        >
          {productInfo?.isActive ? "Active" : "Inactive"}
        </span>
        <CardImg
          alt="Card image cap"
          src={productInfo?.imageUrl}
          top
          width="100%"
          className="card-img"
        />
        <CardBody>
          <div style={{ height: "70%", marginBottom: "10px" }}>
            <CardTitle className="text-center" tag="h5">
              {productInfo.name}
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              {`${productInfo.price} $`}
            </CardSubtitle>
            <CardText>{productInfo.description}</CardText>
          </div>
          <div
            style={{ bottom: "10px" }}
            className="d-flex justify-content-center"
          >
            <button
              className="btn btn-block btn-success"
              type="submit"
              onClick={handleActionWithRole}
            >
              {(userRole?.role == USER_ROLE.MERCHANT && "Update") ||
                (!addCart ? "Add To Cart" : "Go To Cart")}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
