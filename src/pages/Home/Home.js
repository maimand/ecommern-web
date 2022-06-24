import NoContent from "components/NoContent/NoContent";
import useFetchAllProductByCategory from "hook/useFetchAllProductByCategory";
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle
} from "reactstrap";

export const Home = () => {
  const [data] = useFetchAllProductByCategory();
  // const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  return (
    <MainLayout>
      <div className="product-management pt-4">
        <CardGroup className="product d-flex justify-content-start">
          {data?.length == 0 ? (
            <NoContent>NO PRODUCT</NoContent>
          ) : (
            data?.map((product, index) => (
              <div key={index} className="m-2 card-wrapper">
                <Card
                  onClick={() => {
                    history.push(`/product-detail/${product.slug}`);
                  }}
                  className="card-wrapper-content"
                >
                  <CardImg
                    alt="Card image cap"
                    src={product?.imageUrl}
                    top
                    width="100%"
                    className="card-img"
                  />
                  <CardBody>
                    <CardTitle className="card-text" tag="h5">
                      {product.name}
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted card-text"
                      tag="h6"
                    >
                      {`${product.price} $`}
                    </CardSubtitle>
                    <CardText>{product.description}</CardText>
                  </CardBody>
                </Card>
              </div>
            ))
          )}
        </CardGroup>
      </div>
    </MainLayout>
  );
};
