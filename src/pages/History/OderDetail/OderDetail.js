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
                  <td>{order?.purchasePrice}</td>
                  <td>{order?.quantity}</td>
                  <td>{order?.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
