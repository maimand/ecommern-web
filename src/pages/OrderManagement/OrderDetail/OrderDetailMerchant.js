import useFetchOrderDetailMerchant from "hook/useFetchOrderDetailMerchant";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import "./OrderDetailMerchant.scss";

export default function OrderDetailMerchant() {
  const history = useHistory();
  const [data, getOrderDetail] = useFetchOrderDetailMerchant();
  const id = window.location.href.split("/");

  useEffect(() => {
    getOrderDetail(id[id.length - 1]);
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

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

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="merchant-header">
          <h2>Manager Order</h2>
          <div className="action">
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <button
              className="btn btn-danger"
              onClick={() => history.push("/order-managerment")}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="infor">
          <div className="item">{data?.phoneNumber}</div>
          <div></div>
          <div></div>
          <div></div>
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
      </div>
    </MainLayout>
  );
}
