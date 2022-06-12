import useFetchProductDetail from "hook/useFetchProductDetail";
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

import "./ProductDetail.scss";

const ProductDetail = () => {
  const { product } = useFetchProductDetail("629afc70ad435844967a4f89");
  console.log("product detail:  " + product);

  return (
    <MainLayout>
      <div>
        <div className="row show-product">
          <div className="col-md-4 bg-info">
            <div className="show-product-img">
              <img
                src="http://res.cloudinary.com/ecommerce-dut/image/upload/v1654327333/Images/dsifgosqbhvxgp2ze9xc.jpg"
                className="img"
              />
            </div>
            <div>
              <p>merchant</p>
            </div>
          </div>
          <div className="col-md-8 bg-primary">
            <h1>Updatest</h1>

            <p>
              description description description description description
              description description descriptiondescription description
              description description description description description
              description
            </p>
            <p>price: 11</p>
            <FormGroup>
              <Label for="exampleSelect">Select</Label>
              <Input id="exampleSelect" name="select" type="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>

            <div
              style={{ width: "100%" }}
              className="d-flex justify-content-center"
            >
              <button className="btn btn-block btn-success" type="submit">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
