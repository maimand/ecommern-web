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
  const user = JSON.parse(localStorage.getItem("user"));
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
                <Card className="card-wrapper-content">
                  <CardImg
                    alt="Card image cap"
                    src={product?.imageUrl}
                    top
                    width="100%"
                    className="card-img"
                  />
                  <CardBody>
                    <CardTitle className="text-center" tag="h5">
                      {product.name}
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted text-center"
                      tag="h6"
                    >
                      {`${product.price} $`}
                    </CardSubtitle>
                    <CardText>{product.description}</CardText>
                    <div
                      style={{ width: "100%" }}
                      className="d-flex justify-content-center"
                    >
                      {user && (
                        <button
                          className="btn btn-block btn-success"
                          onClick={() => {
                            history.push(`/product-detail/${product.slug}`);
                          }}
                          type="submit"
                        >
                          Detail
                        </button>
                      )}
                    </div>
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
