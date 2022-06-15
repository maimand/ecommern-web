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

  // const addToCart = async (productInfo) => {
  //   try {
  //     setLoading(true);
  //     const dataAddCart = [
  //       {
  //         product: productInfo._id,
  //         quantity: 1,
  //         price: productInfo.price,
  //         merchant: productInfo.merchant
  //       }
  //     ];

  //     const res = await http.post("/api/cart/add", { products: dataAddCart });

  //     if (res.success) {
  //       setLoading(false);
  //       pushToast("success", res.message);
  //     } else {
  //       pushToast("error", res.message);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     pushToast("error", error.message);
  //   }
  // };

  return (
    <MainLayout>
      <div className="product-management pt-4">
        <CardGroup className="product d-flex justify-content-start">
          {data?.map((product, index) => (
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
                        // onClick={() => addToCart(product)}
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
          ))}
        </CardGroup>
      </div>
    </MainLayout>
  );
};
