/*eslint-disable*/
import axios from "axios";
import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import { getToken } from "core/localStore";
import http from "core/services/httpService";
import useFetchProductUpdate from "hook/useFetchProductUpdate";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./UpdateProduct.scss";

export default function UpdateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: ""
  });

  const history = useHistory();
  const id = window.location.href.split("/");
  const [product, getProduct] = useFetchProductUpdate();

  useEffect(() => {
    setData({
      name: product?.name,
      description: product?.description,
      price: product?.price,
      quantity: product?.quantity,
      image: ""
    });
  }, [product]);

  useEffect(() => {
    getProduct(id[id.length - 1]);
  }, []);

  const handleSubmit = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("description", data.description);
    bodyFormData.append("price", data.price);
    bodyFormData.append("quantity", data.quantity);
    bodyFormData.append("image", data.image);
    await axios({
      method: "put",
      url: process.env.REACT_APP_API_URL + `api/product/${id[id.length - 1]}`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(function (response) {
        pushToast("success", response?.message);
        history.push("/");
      })
      .catch(function (response) {
        pushToast("error", response?.message);
      });
  };

  const active = async () => {
    try {
      setIsLoading(true);
      const res = await http.put(`/api/product/restore/${productId}`);
      setIsLoading(true);
      if (res.success) {
        setIsLoading(false);
        pushToast("success", res.message);
      }
    } catch (e) {
      setIsLoading(false);
      pushToast("error", e.message);
    }
  };

  const deActive = async () => {
    try {
      setIsLoading(true);
      const res = await http.put(`/api/product/delete/${productId}`);
      setIsLoading(true);
      if (res.success) {
        setIsLoading(false);
        pushToast("success", res.message);
      }
    } catch (e) {
      setIsLoading(false);
      pushToast("error", e.message);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <MainLayout>
      <Loading visible={isLoading} />
      <div className="update-product position-relative">
        <div onClick={goBack} className="update-back-btn position-absolute"></div>
        <h2>Update Product</h2>

        <div className="update-product position-relative">
          <div
            className="position-absolute"
            style={{ top: "5px", right: "10px" }}
          >
            <button className="btn btn-success mx-2" onClick={active}>
              Activate
            </button>
            <button className="btn btn-danger" onClick={deActive}>
              DeActivate
            </button>
          </div>
          <div className="update-feild">
            <h6>Name</h6>
            <input
              className="item"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="update-feild">
            <h6>description</h6>
            <textarea
              value={data?.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
          <div className="update-feild">
            <h6>quantity</h6>
            <input
              className="item"
              value={data?.quantity}
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
            />
          </div>
          <div className="update-feild">
            <h6>price</h6>
            <input
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
            onClick={() => handleSubmit()}
            disabled={data.image === ""}
          >
            Submit
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
