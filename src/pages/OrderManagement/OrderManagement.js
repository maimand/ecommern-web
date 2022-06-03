import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import useFetchOrdersMerchant from "hook/useFetchOrdersMerchant";
import { Table } from "reactstrap";
import "./OrderManagement.scss";
import { useHistory } from "react-router-dom";

export default function OrderManagement() {
  const [data] = useFetchOrdersMerchant();
  const history = useHistory();

  const tableOrder = data?.map((order, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {index}
        </th>
        <td>{order?.cart?.products.length}</td>
        <td>{order?.cart?.total}</td>
        <td>{order?.paymentStatus}</td>
        <td>{order?.status}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() =>
              history.push(`/order-managerment-detail/${order._id}`)
            }
          >
            Detail
          </button>
        </td>
      </tr>
    );
  });
  return (
    <MainLayout>
      <div className="overview-category">
        <div className="merchant-header">
          <h2>Manager Order</h2>
        </div>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>Stt</th>
                <th>Total Product</th>
                <th>Total Price</th>
                <th>Paymant Status</th>
                <th>Status</th>
                <th style={{ width: "200px" }}>Action</th>
              </tr>
            </thead>
            <tbody>{tableOrder}</tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
