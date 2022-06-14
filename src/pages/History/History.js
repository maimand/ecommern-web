import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchOderHistory from "hook/useFetchOderHistory";
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import "./History.scss";

export default function History() {
  const [orders, getOrderHistory] = useFetchOderHistory();
  const history = useHistory();
  React.useEffect(() => {
    getOrderHistory();
  }, []);

  const handleStatus = async (id, status) => {
    await http
      .put(`/api/order/${id}/status`, {
        status: status
      })
      .then((res) => {
        pushToast("success", res?.message);
        getOrderHistory();
      })
      .catch((error) => {
        pushToast("error", error?.data?.message);
      });
  };

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="merchant-header">
          <h2>History Order</h2>
        </div>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>Stt</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Payment</th>
                <th style={{ width: "320px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, i) => (
                <tr key={i}>
                  <th scope="row" style={{ textAlign: "center" }}>
                    {i}
                  </th>
                  <td>{order?.address}</td>
                  <td>{order?.phoneNumber}</td>
                  <td>{order?.status}</td>
                  <td>{order?.payment}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleStatus(order?._id, "RECEIVED")}
                    >
                      Receive
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => handleStatus(order?._id, "CANCEL")}
                    >
                      Cancel
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        history.push(`/order-history/${order?._id}`)
                      }
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
