import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Label } from "reactstrap";
import "./AddProduct.scss";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { subCategoryId } = useParams();
  const history = useHistory();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    subcategory: "",
    image: ""
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    var bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("description", data.description);
    bodyFormData.append("price", data.price);
    bodyFormData.append("quantity", data.quantity);
    bodyFormData.append("subcategory", subCategoryId);
    bodyFormData.append("image", data.image);

    await http
      .post(`/api/product/add`, bodyFormData)
      .then(function (response) {
        setIsLoading(false);
        pushToast("success", response?.message);

        history.push("/");
      })
      .catch(function (response) {
        setIsLoading(false);
        pushToast("error", response?.message);
      });
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <MainLayout>
      <Loading visible={isLoading} />
      <div className="update-product">
        <div
          onClick={goBack}
          className="update-back-btn position-absolute"
        ></div>
        <h2>Add Product</h2>
        <div>
          <div className="update-feild">
            <Label for="name">Name</Label>
            <input
              id="name"
              className="item"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="update-feild">
            <Label for="description">description</Label>
            <textarea
              id="description"
              value={data?.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
          <div className="update-feild">
            <Label for="quantity">quantity</Label>
            <input
              id="quantity"
              className="item"
              value={data?.quantity}
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
            />
          </div>

          <div className="update-feild">
            <Label for="price">price</Label>
            <input
              id="price"
              className="item"
              value={data?.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
          </div>
          <div className="update-feild">
            <h6>image</h6>
            <input
              type="file"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            />
          </div>
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={data.image === ""}
          >
            Submit
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddProduct;
