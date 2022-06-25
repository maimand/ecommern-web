import useFetchOderDetail from "hook/useFetchOderDetail";
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import "./OderDetail.scss";

export default function OderDetail() {
  const [detail, getOrderDetail] = useFetchOderDetail();
  const history = useHistory();
  const id = window.location.href.split("/");
  React.useEffect(() => {
    getOrderDetail(id[id.length - 1]);
  }, []);

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="merchant-header">
          <h2>History Order</h2>
          <button
            className="btn btn-danger"
            onClick={() => history.push("/user/history")}
          >
            Back
          </button>
        </div>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>Stt</th>
                <th>Name</th>
                <th>Image</th>
                <th>Purchase Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {detail?.cart?.products.map((order, i) => (
                <tr key={i}>
                  <th scope="row" style={{ textAlign: "center" }}>
                    {i}
                  </th>
                  <td>{order?.product?.name}</td>
                  <td>
                    <img
                      src={order?.product?.imageUrl}
                      style={{ height: "80px" }}
                    />
                  </td>
                  <td>{order?.purchasePrice}</td>
                  <td>{order?.quantity}</td>
                  <td>{order?.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="infor">
            <div className="item">
              <h6 style={{ fontWeight: "bold" }}>Customer:</h6>
              {detail?.user?.firstName + " " + detail?.user?.lastName}
            </div>
            <div className="item">
              <h6 style={{ fontWeight: "bold" }}>Phone Number:</h6>{" "}
              {detail?.phoneNumber}
            </div>
            <div className="item">
              <h6 style={{ fontWeight: "bold" }}>Address: </h6>
              {detail?.address}
            </div>
            <div className="item">
              <h6 style={{ fontWeight: "bold" }}>Total amount: </h6>
              {detail?.cart?.total}
            </div>
            <div className="item">
              <h6 style={{ fontWeight: "bold" }}>Payment status: </h6>
              {detail?.paymentStatus}
            </div>
            <div className="item">
              <h6 style={{ fontWeight: "bold" }}>Status: </h6>
              {detail?.status}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
