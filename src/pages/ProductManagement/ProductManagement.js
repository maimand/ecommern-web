import Product from "components/Product/Product";
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import { CardGroup } from "reactstrap";

const ProductManagement = () => {
  return (
    <MainLayout>
      <CardGroup>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </CardGroup>
    </MainLayout>
  );
};

export default ProductManagement;
