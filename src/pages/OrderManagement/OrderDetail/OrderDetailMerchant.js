import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchOrderDetailMerchant from "hook/useFetchOrderDetailMerchant";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import "./OrderDetailMerchant.scss";

export default function OrderDetailMerchant() {
  const [stateOrder, setStateOrder] = useState("PROCESSING");

  const history = useHistory();
  const [data, getOrderDetail] = useFetchOrderDetailMerchant();
  const id = window.location.href.split("/");

  useEffect(() => {
    getOrderDetail(id[id.length - 1]);
    setStateOrder(data?.status);
  }, []);

  useEffect(() => {}, [data]);

  const tableOrder = data?.cart?.products?.map((product, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {index}
        </th>
        <td>{product?.product?.name}</td>
        <td>{product?.quantity}</td>
        <td>{product?.purchasePrice}</td>
        <td>{product?.totalPrice}</td>
      </tr>
    );
  });

  const submit = () => {
    http
      .put(`/api/order/${id[id.length - 1]}/status`, { status: stateOrder })
      .then((response) => {
        pushToast("success", response.message);
        history.push("/order-management");
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="merchant-header">
          <h2>Manager Order</h2>
          <div className="action">
            <select
              className="form-select"
              aria-label="Default select example"
              value={stateOrder}
              disabled={data?.status === "CANCEL"}
              onChange={(e) => setStateOrder(e.target.value)}
            >
              <option value="PROCESSING">PROCESSING</option>
              <option value="DELIVERING">DELIVERING</option>
              <option value="CANCEL">CANCEL</option>
            </select>
            <button
              disabled={data?.status === "CANCEL"}
              className="btn btn-success"
              style={{ marginRight: "10px" }}
              onClick={() => submit()}
            >
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => history.push("/order-management")}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>Stt</th>
                <th>Name Product</th>
                <th>Quantity</th>
                <th>Purchase Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>{tableOrder}</tbody>
          </Table>
        </div>
        <div className="infor">
          <div className="item">
            {" "}
            <h6>User Name:</h6>{" "}
            {data?.user?.firstName + " " + data?.user?.lastName}
          </div>
          <div className="item">
            <h6>Phone Number:</h6> {data?.phoneNumber}
          </div>
          <div className="item">
            <h6>Status: </h6>
            {data?.status}
          </div>
          <div className="item">
            <h6>Address: </h6>
            {data?.address}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
