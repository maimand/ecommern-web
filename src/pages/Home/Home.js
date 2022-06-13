import Product from "components/Product/Product";
import useFetchAllProductByCategory from "hook/useFetchAllProductByCategory";
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import { CardGroup } from "reactstrap";

export const Home = () => {
  const [data] = useFetchAllProductByCategory();

  return (
    <MainLayout>
      <div className="product-management pt-4">
        <CardGroup className="product">
          {data?.map((product, index) => (
            <Product
              key={index}
              className="product-item"
              productInfo={product}
            />
          ))}
        </CardGroup>
      </div>
    </MainLayout>
  );
};
