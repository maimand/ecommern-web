import NoContent from "components/NoContent/NoContent";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchProductDetail from "hook/useFetchProductDetail";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useState } from "react";
import { FormGroup, Input } from "reactstrap";
import { setLoading } from "store/user";

import "./ProductDetail.scss";

const ProductDetail = () => {
  const [productInfo] = useFetchProductDetail();
  const [quantity, setQuantity] = useState(1);

  let indents = [];
  for (var i = 0; i < productInfo?.quantity; i++) {
    indents.push(
      <option className="indent" key={i}>
        {i + 1}
      </option>
    );
  }

  const addToCart = async () => {
    try {
      setLoading(true);
      const dataAddCart = [
        {
          product: productInfo._id,
          quantity: 1,
          price: productInfo.price,
          merchant: productInfo.merchant
        }
      ];
      dataAddCart[0].quantity = quantity;

      const res = await http.post("/api/cart/add", { products: dataAddCart });

      if (res.success) {
        setLoading(false);
        pushToast("success", res.message);
      } else {
        pushToast("error", res.message);
      }
    } catch (error) {
      setLoading(false);
      pushToast("error", error.message);
    }
  };

  return (
    <MainLayout>
      {!productInfo ? (
        <NoContent>No Product</NoContent>
      ) : (
        <div className="row show-product">
          <div className="col-md-4">
            <div className="show-product-img">
              <img src={productInfo?.imageUrl} className="img" />
            </div>
            <div className="d-flex justify-content-center">
              <h3>{productInfo?.merchant?.name}</h3>
            </div>
          </div>
          <div className="col-md-8 show-product-info">
            <h1>{productInfo?.name}</h1>

            <p>{productInfo?.description}</p>
            <p className="product-price">
              {`Price: `}
              <span>{` ${productInfo?.price} `}$</span>
            </p>
            <FormGroup className="product-quantity ">
              <Input
                id="exampleSelect d-inline"
                onChange={(event) => setQuantity(event.target.value)}
                name="select"
                type="select"
              >
                {indents}
              </Input>
            </FormGroup>

            <div
              style={{ width: "100%" }}
              className="d-flex justify-content-center"
            >
              <button
                className="btn btn-block btn-success"
                onClick={addToCart}
                type="submit"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ProductDetail;
