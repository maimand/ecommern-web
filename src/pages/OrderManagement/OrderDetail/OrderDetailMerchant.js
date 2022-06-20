import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchOrderDetailMerchant from "hook/useFetchOrderDetailMerchant";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Table } from "reactstrap";
import "./OrderDetailMerchant.scss";

export default function OrderDetailMerchant() {
  const history = useHistory();
  const [data, getOrderDetail] = useFetchOrderDetailMerchant();
  const [stateOrder, setStateOrder] = useState(data?.status);
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
        <td>
          <img src={product?.product?.imageUrl} style={{ height: "80px" }} />
        </td>
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
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="merchant-header">
          <h2>Order Details</h2>
          <div className="action">
            <Input
              name="select"
              type="select"
              value={stateOrder}
              disabled={
                data?.status === "CANCEL" || data?.status === "RECEIVED"
                  ? true
                  : false
              }
              onChange={(event) => {
                setStateOrder(event.target.value);
              }}
            >
              <option value="PROCESSING">PROCESSING</option>
              <option value="DELIVERING">DELIVERING</option>
              <option value="RECEIVED">RECEIVED</option>
              <option value="CANCEL">CANCEL</option>
              <option value="NOT_PROCESS">NOT_PROCESS</option>
            </Input>
            <button
              disabled={data?.status === "CANCEL"}
              className="btn btn-success"
              style={{ marginRight: "10px" }}
              onClick={() => submit()}
            >
              Save
            </button>
            <button className="btn btn-danger" onClick={() => history.goBack()}>
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
                <th>Image</th>
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
            <h6 style={{ fontWeight: "bold" }}>Customer:</h6>
            {data?.user?.firstName + " " + data?.user?.lastName}
          </div>
          <div className="item">
            <h6 style={{ fontWeight: "bold" }}>Phone Number:</h6>{" "}
            {data?.phoneNumber}
          </div>
          <div className="item">
            <h6 style={{ fontWeight: "bold" }}>Address: </h6>
            {data?.address}
          </div>
          <div className="item">
            <h6 style={{ fontWeight: "bold" }}>Total amount: </h6>
            {data?.cart?.total}
          </div>
          <div className="item">
            <h6 style={{ fontWeight: "bold" }}>Payment status: </h6>
            {data?.paymentStatus}
          </div>
          <div className="item">
            <h6 style={{ fontWeight: "bold" }}>Status: </h6>
            {data?.status}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
